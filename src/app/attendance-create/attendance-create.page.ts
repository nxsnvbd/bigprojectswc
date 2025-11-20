import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.page.html',
  styleUrls: ['./attendance-create.page.scss'],
})
export class AttendanceCreatePage implements OnInit {

  eventTitle: string = '';
  eventDate: string = ''; 

  constructor(
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async createAttendance() {
    if (!this.eventTitle || !this.eventDate) {
      this.showToast('Please enter event title and select date');
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Saving...'
    });
    await loader.present();

    try {
      const id = this.firestore.createId();
      await this.firestore.collection('attendance').doc(id).set({
        attendanceID: id,
        title: this.eventTitle,
        date: this.eventDate,     
        present: 0,
        absent: 0,
        dateCreated: new Date()
      });

      this.showToast('Attendance event created successfully');
      this.navCtrl.back();
    } catch (err: any) {
      this.showToast(err.message || 'Error creating event');
    }

    await loader.dismiss();
  }

  private showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
