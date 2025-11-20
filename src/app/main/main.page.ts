import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

interface Announcement {
  id: string;
  title: string;
  details: string;
  photo?: string;
  createdAt: any;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  announcements$: Observable<Announcement[]> | undefined;
  userRole: string = 'member'; // default
  userId: string = '';

  // 🖼️ Image preview modal state
  isImageModalOpen = false;
  selectedImage: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // ✅ Fetch announcements
    this.announcements$ = this.firestore
      .collection<Announcement>('announcement', ref =>
        ref.orderBy('createdAt', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Omit<Announcement, 'id'>;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );

    // ✅ Load user role
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

  // ✅ Get role from Firestore users collection
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

  // ✅ Delete announcement with confirmation
  async deleteAnnouncement(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this announcement?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.firestore.collection('announcement').doc(id).delete();
              const toast = await this.toastCtrl.create({
                message: 'Announcement deleted successfully.',
                duration: 2000,
              });
              toast.present();
            } catch (error) {
              const toast = await this.toastCtrl.create({
                message: 'Error deleting announcement: ' + error,
                duration: 2000,
                color: 'danger',
              });
              toast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // 🖼️ Image preview modal functions
  openImagePreview(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isImageModalOpen = true;
  }

  closeImagePreview() {
    this.isImageModalOpen = false;
    this.selectedImage = null;
  }
}
