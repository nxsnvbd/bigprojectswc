import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaCreatePageRoutingModule } from './media-create-routing.module';

import { MediaCreatePage } from './media-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaCreatePageRoutingModule
  ],
  declarations: [MediaCreatePage]
})
export class MediaCreatePageModule {}
