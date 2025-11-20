import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {
  feedbackId: string = '';
  feedback: any;
  status: string = '';
  userRole: string = 'member';
  showStatusControls: boolean = true; // ✅ Controls visibility of dropdown & button

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.feedbackId = this.route.snapshot.paramMap.get('id') || '';
    if (this.feedbackId) {
      this.loadFeedback();
    }

    // ✅ Get user role
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  // ✅ Load feedback details
  loadFeedback() {
    this.firestore.collection('feedbackComplaint').doc(this.feedbackId)
      .valueChanges()
      .subscribe((data: any) => {
        this.feedback = data;

        // Hide controls if status is Completed or Rejected
        if (data?.status?.toLowerCase() === 'completed' || data?.status?.toLowerCase() === 'rejected') {
          this.showStatusControls = false;
        }
      });
  }

  // Update feedback status
  async markStatus() {
    try {
      await this.firestore.collection('feedbackComplaint').doc(this.feedbackId).update({
        status: this.status
      });

      this.showToast('Feedback status updated successfully.');

      // Hide controls if status is Completed or Rejected
      if (this.status.toLowerCase() === 'completed' || this.status.toLowerCase() === 'rejected') {
        this.showStatusControls = false;
      }

      // Redirect back to feedback list after delay
      setTimeout(() => {
        this.router.navigateByUrl('/feedback', { replaceUrl: true });
      }, 1000);

    } catch (err: any) {
      this.showToast(err.message || 'Error updating status');
    }
  }

  private showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
