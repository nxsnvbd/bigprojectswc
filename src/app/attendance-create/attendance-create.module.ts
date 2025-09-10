import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceCreatePageRoutingModule } from './attendance-create-routing.module';

import { AttendanceCreatePage } from './attendance-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceCreatePageRoutingModule
  ],
  declarations: [AttendanceCreatePage]
})
export class AttendanceCreatePageModule {}
