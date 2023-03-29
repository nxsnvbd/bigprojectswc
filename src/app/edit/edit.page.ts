import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user = {} as User;
  email: any;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.email = this.actRoute.snapshot.paramMap.get("email");
  }

  ngOnInit() {
    this.getUserByEmail(this.email);
  }

  async getUserByEmail(email: string) {
    //show loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();
    this.firestore.doc("register/" + email)
      .valueChanges()
      .subscribe((data: any) => {
        this.user.name = data["name"];
        this.user.email = data["email"];
        this.user.password = data["password"];
        this.user.date = data["date"];
        this.user.telephone = data["telephone"];
        this.user.address = data["address"];
      });
    //dismiss loader
    (await loader).dismiss();
  }
  
  async updateUser(user: User) {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {

        await this.firestore.doc("register/" + this.email).update(user);
      } catch (e: any) {
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
      //redirect to view post page
      this.navCtrl.navigateRoot("profile");
    }
  }
  formValidation() {
    if (!this.user.name) {
      this.showToast("Enter name");
      return false;
    }
    if (!this.user.email) {
      this.showToast("Enter email");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Enter password");
      return false;
    }
    if (!this.user.date) {
      this.showToast("Enter date of birth");
      return false;
    }
    if (!this.user.telephone) {
      this.showToast("Enter telephone number");
      return false;
    }
    if (!this.user.address) {
      this.showToast("Enter address");
      return false;
    }
    return true;
  }
  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
      .then(toastData => toastData.present());
  }
}