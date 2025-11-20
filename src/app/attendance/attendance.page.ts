import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';
import { FileOpener } from '@capacitor-community/file-opener';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit, OnDestroy {
  attendanceList!: Observable<any[]>;
  attendanceData: any[] = []; // ✅ Local copy for UI filtering
  userRole: string = '';
  userId: string = '';
  userName: string = '';
  private userSub?: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) {}

  ngOnInit() {
    // ✅ Load UID from localStorage or Firebase
    const savedUid = localStorage.getItem('uid');
    if (savedUid) {
      this.userId = savedUid;
      this.loadUserRole();
    }

    // ✅ Listen for Firebase auth state
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadUserRole();
      }
    });
  }

  // ✅ Load user role and name
  loadUserRole() {
    if (!this.userId) return;

    this.userSub = this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((userData: any) => {
        if (userData) {
          this.userRole = userData.role || 'member';
          this.userName = userData.name || '';
          this.loadAttendanceList();
        }
      });
  }

  // ✅ Load attendance list (filtered for members)
  loadAttendanceList() {
    const attendance$ = this.firestore
      .collection('attendance', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { attendanceID: id, ...data };
          })
        )
      );

    // ✅ For members: filter out already marked events
    if (this.userRole === 'member') {
      this.attendanceList = attendance$.pipe(
        switchMap(events =>
          combineLatest(
            events.map(event =>
              this.checkIfMarked(event.attendanceID).pipe(
                map(alreadyMarked => (alreadyMarked ? null : event))
              )
            )
          )
        ),
        map(results => results.filter((e): e is any => !!e))
      );
    } else {
      this.attendanceList = attendance$; // Admin sees all
    }

    this.attendanceList.subscribe(list => (this.attendanceData = list));
  }

  // ✅ Check if member has already marked attendance
  checkIfMarked(eventId: string): Observable<boolean> {
    const present$ = this.firestore
      .collection(`attendance/${eventId}/present`)
      .doc(this.userId)
      .get()
      .pipe(map(doc => doc.exists));

    const absent$ = this.firestore
      .collection(`attendance/${eventId}/absent`)
      .doc(this.userId)
      .get()
      .pipe(map(doc => doc.exists));

    return combineLatest([present$, absent$]).pipe(
      map(([isPresent, isAbsent]) => isPresent || isAbsent)
    );
  }

  // Member marks Present or Absent
  async markAttendance(eventId: string, type: 'Present' | 'Absent') {
    if (this.userRole !== 'member') return;

    try {
      const field = type.toLowerCase();
      const eventRef = this.firestore.collection('attendance').doc(eventId);

      // Check if already marked (extra safety)
      const alreadyPresent = await eventRef
        .collection('present')
        .doc(this.userId) 
        .get()
        .toPromise();
      const alreadyAbsent = await eventRef
        .collection('absent')
        .doc(this.userId)
        .get()
        .toPromise();

      if (alreadyPresent?.exists || alreadyAbsent?.exists) {
        console.warn('You already marked attendance for this event.');
        return;
      }

      // Save user's record
      await eventRef.collection(field).doc(this.userId).set({
        userId: this.userId,
        name: this.userName,
        timestamp: new Date(),
      });
 
      // Increment counter
      await eventRef.update({
        [field]: firebase.firestore.FieldValue.increment(1),
      });

      console.log(`${type} marked for ${this.userName}`);

      // ✅ Remove from UI instantly
      this.attendanceData = this.attendanceData.filter(
        (item: any) => item.attendanceID !== eventId
      );

    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  }

// Admin generates and views PDF report 
async generateAttendanceReport(attendanceId: string, title: string) {
  if (this.userRole !== 'admin') {
    console.warn('Only admins can generate attendance reports.');
    return;
  }

  try {
    const eventRef = this.firestore.collection('attendance').doc(attendanceId);

    // Fetch "present" and "absent" subcollections
    const [presentSnap, absentSnap] = await Promise.all([
      eventRef.collection('present').get().toPromise(),
      eventRef.collection('absent').get().toPromise(),
    ]);

    const presentList = presentSnap?.docs.map(doc => doc.data()) || [];
    const absentList = absentSnap?.docs.map(doc => doc.data()) || [];

    // Create PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${title} - Attendance Report`, 10, 15);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, 25);

    // Present list
    (autoTable as any)(doc, {
      startY: 35,
      head: [['No', 'Name', 'User ID', 'Status', 'Timestamp']],
      body: presentList.map((d: any, i: number) => [
        i + 1,
        d.name || 'Unknown',
        d.userId,
        'Present',
        d.timestamp?.seconds ? new Date(d.timestamp.seconds * 1000).toLocaleString() : '',
      ]),
      theme: 'grid',
      headStyles: { fillColor: [40, 167, 69] },
    });

    // Absent list
    const lastY = (doc as any).lastAutoTable?.finalY ? (doc as any).lastAutoTable.finalY + 10 : 60;
    (autoTable as any)(doc, {
      startY: lastY,
      head: [['No', 'Name', 'User ID', 'Status', 'Timestamp']],
      body: absentList.map((d: any, i: number) => [
        i + 1,
        d.name || 'Unknown',
        d.userId,
        'Absent',
        d.timestamp?.seconds ? new Date(d.timestamp.seconds * 1000).toLocaleString() : '',
      ]),
      theme: 'grid',
      headStyles: { fillColor: [220, 53, 69] },
    });

    // Create blob
    const pdfBlob = doc.output('blob');

    // Convert to Base64 for Filesystem.writeFile
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(pdfBlob);
    });

    const safeTitle = title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
    const fileName = `${safeTitle}_Report.pdf`;

    // Request permissions (important on Android)
    try {
      await Filesystem.requestPermissions(); // safe to call on all platforms
    } catch (permErr) {
      console.warn('Filesystem.requestPermissions() failed or not required:', permErr);
    }

    // Choose directory: External on Android (so other apps can access), Documents otherwise
    const writeDirectory = this.platform.is('android') ? Directory.External : Directory.Documents;

    // Save file
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: writeDirectory,
      recursive: true
    });

    // savedFile.uri should be a native file:// or content:// URI on mobile
    const fileUri = (savedFile as any).uri || (savedFile as any).uriString || savedFile.uri;
    console.log('Saved PDF file:', savedFile, 'resolved uri:', fileUri);

    // Mobile (native) flow: try to open with FileOpener, then fallback to Share
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('hybrid')) {
      try {
        // Try opening with native FileOpener (gives "Open with..." + Save options)
        await FileOpener.open({
          filePath: fileUri,
          contentType: 'application/pdf'
        });
        return; // opened successfully
      } catch (openErr) {
        console.warn('FileOpener.open failed, falling back to Share or Browser:', openErr);
      }

      // Fallback: share the file (user can save to Drive, email, etc.)
      try {
        await Share.share({
          title: `${title} - Attendance Report`,
          text: 'Attendance report PDF',
          url: fileUri,
        });
        return;
      } catch (shareErr) {
        console.warn('Share fallback failed:', shareErr);
      }

      // Last resort: try Browser.open (some devices may accept content:// links)
      try {
        await Browser.open({ url: fileUri });
        return;
      } catch (browserErr) {
        console.warn('Browser.open fallback failed:', browserErr);
      }

      // If all fallbacks failed, show message to user (or handle UI)
      console.error('Unable to open or share the saved PDF. savedFile:', savedFile);
      return;
    }

    // Web fallback: open blob in new tab
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');

  } catch (error) {
    console.error('Error generating or viewing report:', error);
  }
}


  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
