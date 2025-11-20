import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.services';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {
    // ✅ Check if user already logged in (persistent session)
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log('User still logged in:', user.email);
        this.navCtrl.navigateRoot('/dashboard'); // Change this to your main/home page
      } else {
        console.log('User not logged in, redirecting to login...');
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  ngOnInit() {
    // ✅ Keep your existing user role logic
    this.authService.getUserRole().subscribe((role) => {
      this.userRole = role;
      console.log('AppComponent user role:', role);
    });
  }
}
