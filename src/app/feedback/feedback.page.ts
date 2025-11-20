import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit, OnDestroy {
  feedbacks: any[] = [];
  userRole: string = '';
  userId: string = ''; // will store UID of logged-in user
  private feedbackSub?: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Load UID from localStorage if available
    const savedUid = localStorage.getItem('uid');
    if (savedUid) {
      this.userId = savedUid;
      console.log('Loaded UID from localStorage:', this.userId);
      this.loadUserRole();
    }

    // Also listen for Firebase auth changes
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        console.log('Loaded UID from Firebase Auth:', this.userId);
        this.loadUserRole();
      }
    });
  }

  // Load user role
  loadUserRole() {
    if (!this.userId) return;

    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((userData: any) => {
        if (userData) {
          this.userRole = userData.role || 'member';
          console.log('User role:', this.userRole);
          this.loadFeedbacks();
        } else {
          console.warn('No user document found for UID:', this.userId);
        }
      });
  }

  // Load feedbacks based on role
  loadFeedbacks() {
    if (this.feedbackSub) this.feedbackSub.unsubscribe();

    console.log('Loading feedbacks for role:', this.userRole, 'UID:', this.userId);

    if (this.userRole === 'admin') {
      // Admins: show all
      this.feedbackSub = this.firestore
        .collection('feedbackComplaint', ref => ref.orderBy('dateSubmitted', 'desc'))
        .snapshotChanges()
        .subscribe(res => {
          this.feedbacks = res.map(e => {
            const data: any = e.payload.doc.data();
            return { id: e.payload.doc.id, ...data };
          });
          console.log('Admin feedbacks loaded:', this.feedbacks.length);
        });
    } else {
      // Members: show only their feedbacks (must match field name "uid")
      this.feedbackSub = this.firestore
        .collection('feedbackComplaint', ref =>
          ref.where('uid', '==', this.userId)
        )
        .snapshotChanges()
        .subscribe(res => {
          this.feedbacks = res.map(e => {
            const data: any = e.payload.doc.data();
            return { id: e.payload.doc.id, ...data };
          });
          console.log('Member feedbacks loaded:', this.feedbacks.length);
        });
    }
  }

  ngOnDestroy() {
    if (this.feedbackSub) this.feedbackSub.unsubscribe();
  }
}
