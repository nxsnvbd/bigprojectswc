import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import{ LoadingController,NavController, ToastController} from '@ionic/angular';
import {User} from '../models/user.mode';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
user = {} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore
    ) { }

  ngOnInit() {
  }

    async createUser(user: User){
    if(this.formValidation()){
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

    try{
        
    await this.firestore.collection("user").add(user);
  } catch (e:any){
    this.showToast(e);
  }
    //dismiss loader
    (await loader).dismiss();

    //redirect to home page
    this.navCtrl.navigateRoot("main");
    }
  }

  async register (user: User) {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try {
        localStorage.setItem('useremail', user.email);
        await this.afAuth
        .createUserWithEmailAndPassword (user.email, user.password)
        .then (data =>
          console.log(data));

          await this.createUser(user);

          //redirect to main page
          this.navCtrl.navigateRoot("main");
      } catch (err:any) {
        this.showToast (err);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

  formValidation(){
    if(!this.user.name){
      this.showToast("Enter name");
      return false;
    }

    if(!this.user.email){
      this.showToast("Enter email");
      return false;
    }

    if(!this.user.username){
      this.showToast("Enter username");
      return false;
    }

     if(!this.user.password){
      this.showToast("Enter password");
      return false;
    }

    return true;
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
   }

}
