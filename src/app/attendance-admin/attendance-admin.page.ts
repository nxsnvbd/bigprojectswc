import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.page.html',
  styleUrls: ['./attendance-admin.page.scss'],
})
export class AttendanceAdminPage implements OnInit {

  attendanceList!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.attendanceList = this.firestore
      .collection('attendance', ref => ref.orderBy('dateCreated', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { attendanceID: id, ...data };
          })
        )
      );
  }
}
