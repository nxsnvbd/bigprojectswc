import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    name: '',
    email: '',
    username: '',
    password: ''
  };

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async register(user: any) {
    try {
      // ✅ Create user in Firebase Authentication
      const result = await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );

      if (result.user) {
        const uid = result.user.uid;

        await this.firestore.collection('users').doc(result.user.uid).set({
          uid: result.user.uid,
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,  // ⚠️ optional, not secure
          role: 'member',
          dateCreated: new Date()
        });

        this.showToast('Account created successfully');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      this.showToast(error.message || 'Registration failed', 'danger');
    }
  }

  private async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}