import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.page.html',
  styleUrls: ['./feedback-create.page.scss'],
})
export class FeedbackCreatePage implements OnInit {
  title: string = '';
  description: string = '';
  category: string = '';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async submitFeedback() {
    if (!this.title || !this.description || !this.category) {
      this.showToast('Please fill in all fields');
      return;
    }

    const loader = await this.loadingCtrl.create({
      message: 'Submitting...'
    });
    await loader.present();

    try {
      const currentUser = await this.afAuth.currentUser;

      if (!currentUser) {
        this.showToast('You must be logged in to submit feedback');
        await loader.dismiss();
        return;
      }

      const uid = currentUser.uid;

      // Fetch user data from Firestore
      const userQuery = await this.firestore
        .collection('users', ref => ref.where('uid', '==', uid))
        .get()
        .toPromise();

      const userData: any = userQuery?.docs[0]?.data();

      // Get full name
      const name = userData?.name || 'Unknown User';

      // Generate unique feedbackID
      const feedbackID = this.firestore.createId();

      // Save feedback with "feedbackID" instead of "id"
      await this.firestore.collection('feedbackComplaint').doc(feedbackID).set({
        feedbackID: feedbackID,
        title: this.title,
        description: this.description,
        category: this.category,
        status: 'Pending',
        dateSubmitted: new Date(),
        uid: uid,
        name: name
      });

      this.showToast('Feedback submitted successfully');
      this.navCtrl.back();
    } catch (err: any) {
      this.showToast(err.message || 'Error submitting feedback');
    }

    await loader.dismiss();
  }

  private showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
