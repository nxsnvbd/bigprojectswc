import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';
import { FileOpener } from '@capacitor-community/file-opener';
import { Share } from '@capacitor/share';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {
  mediaList: any[] = [];
  userRole: string = 'member';
  userId: string = '';

  slideOpts = {
  initialSlide: 0,
  speed: 400,
  spaceBetween: 10,
  loop: false,
  autoplay: false,
};


  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private platform: Platform, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadMedia();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadUserRole();
      } else {
        const savedRole = localStorage.getItem('role');
        if (savedRole) this.userRole = savedRole;
      }
    });
  }

  // ✅ Load media list
  loadMedia() {
    this.firestore
      .collection('media', ref => ref.orderBy('dateUploaded', 'desc'))
      .snapshotChanges()
      .subscribe(res => {
        this.mediaList = res.map(e => {
          const data: any = e.payload.doc.data();
          return { id: e.payload.doc.id, ...data };
        });
      });
  }

  // ✅ Load user role
  loadUserRole() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((userData: any) => {
        if (userData?.role) {
          this.userRole = userData.role;
          localStorage.setItem('role', userData.role);
        }
      });
  }

  // ✅ Delete media (admin only)
  async deleteMedia(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this media?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.firestore.collection('media').doc(id).delete();
              this.showToast('Media deleted successfully.', 'danger');
            } catch (error) {
              this.showToast('Error deleting media: ' + error, 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async downloadAndOpenPDF(pdfUrl: string) {
  try {
    if (!pdfUrl) throw new Error('No PDF URL provided.');

    // ✅ Use exactly the URL stored in Firestore
    const cleanUrl = pdfUrl;

    // ✅ Add download parameter so browser shows download button
    const downloadableUrl = cleanUrl.includes('?')
      ? `${cleanUrl}&download=1`
      : `${cleanUrl}?download=1`;

    // ✅ Open directly in browser (user can download manually)
    await Browser.open({ url: downloadableUrl });

    this.showToast('Opening PDF in browser...');
  } catch (error: any) {
    console.error('Error opening PDF:', error);
    this.showToast('Failed to open PDF: ' + (error.message || error), 'danger');
  }
}

  private async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
