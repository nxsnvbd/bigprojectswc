import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceAdminPageRoutingModule } from './attendance-admin-routing.module';

import { AttendanceAdminPage } from './attendance-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceAdminPageRoutingModule
  ],
  declarations: [AttendanceAdminPage]
})
export class AttendanceAdminPageModule {}
