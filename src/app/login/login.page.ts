import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async login(user: User) {
    if (!this.formValidation()) return;

    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loader.present();

    try {
      // ✅ Sign in user
      const result = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
      const firebaseUser = result.user;

      if (firebaseUser) {
        // ✅ Save UID & Email locally for quick access
        localStorage.setItem('uid', firebaseUser.uid);
        localStorage.setItem('useremail', firebaseUser.email || '');

        // ✅ Optional: Fetch role from Firestore and save
        const userDoc = await this.firestore.collection('users').doc(firebaseUser.uid).get().toPromise();
        const userData: any = userDoc?.data();

        if (userData) {
          localStorage.setItem('role', userData.role);
          localStorage.setItem('username', userData.username);
          console.log('User logged in:', userData);
        }

        // ✅ Navigate to main page
        this.navCtrl.navigateRoot('main');
      }
    } catch (e: any) {
      console.error(e);
      this.showToast(e.message || 'Login failed');
    }

    await loader.dismiss();
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast('Enter email');
      return false;
    }
    if (!this.user.password) {
      this.showToast('Enter password');
      return false;
    }
    return true;
  }

  private showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
        position: 'bottom',
      })
      .then(toastData => toastData.present());
  }
}
