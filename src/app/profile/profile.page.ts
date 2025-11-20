import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any = null;
  docId: string = '';
  isEditing: boolean = false; // track edit mode

  constructor(
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getUserProfile();
  }

  async getUserProfile() {
    const loader = await this.loadingCtrl.create({ message: 'Loading profile...' });
    await loader.present();

    try {
      const userEmail = localStorage.getItem('useremail');
      if (!userEmail) {
        this.showToast('No logged-in user found.');
        loader.dismiss();
        return;
      }

      this.firestore
        .collection('users', ref => ref.where('email', '==', userEmail))
        .snapshotChanges()
        .subscribe((res: any) => {
          if (res.length > 0) {
            this.docId = res[0].payload.doc.id;
            const data = res[0].payload.doc.data();
            this.userProfile = {
              name: data.name,
              email: data.email,
              username: data.username,
              password: data.password
            };
          } else {
            this.userProfile = null;
            this.showToast('User not found');
          }
          loader.dismiss();
        });
    } catch (error: any) {
      loader.dismiss();
      this.showToast(error.message || 'Error fetching profile');
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  async saveProfile() {
    if (!this.userProfile.name || !this.userProfile.username || !this.userProfile.password) {
      this.showToast('Please fill in all fields');
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Saving profile...' });
    await loader.present();

    try {
      await this.firestore.collection('users').doc(this.docId).update({
        name: this.userProfile.name,
        username: this.userProfile.username,
        password: this.userProfile.password
      });

      this.isEditing = false; // disable edit mode after saving
      this.showToast('Profile updated successfully!');
    } catch (error: any) {
      this.showToast(error.message || 'Error updating profile');
    }

    loader.dismiss();
  }

  private showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
