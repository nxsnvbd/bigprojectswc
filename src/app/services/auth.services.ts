import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole$ = new BehaviorSubject<string>('guest');

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // ✅ Ensure session persists even after closing the app
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => console.log('Firebase Auth persistence set to LOCAL'))
      .catch(err => console.error('Persistence setup error:', err));

    // ✅ Keep listening to auth changes and store role in memory
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges().pipe(
            map((userData: any) => userData?.role || 'member')
          );
        } else {
          return of('guest');
        }
      })
    ).subscribe(role => this.userRole$.next(role));
  }

  // ✅ Get Firebase user object
  async getCurrentUser(): Promise<firebase.User | null> {
    return await this.afAuth.currentUser;
  }

  // ✅ Observable for user role (real-time)
  getUserRole() {
    return this.userRole$.asObservable();
  }

  // ✅ Manual logout
  async logout() {
    await this.afAuth.signOut();
    this.userRole$.next('guest');
  }
}
