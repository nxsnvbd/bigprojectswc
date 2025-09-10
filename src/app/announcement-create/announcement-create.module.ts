import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncementCreatePageRoutingModule } from './announcement-create-routing.module';

import { AnnouncementCreatePage } from './announcement-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncementCreatePageRoutingModule
  ],
  declarations: [AnnouncementCreatePage]
})
export class AnnouncementCreatePageModule {}
