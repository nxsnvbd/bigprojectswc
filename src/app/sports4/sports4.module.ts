import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sports4PageRoutingModule } from './sports4-routing.module';

import { Sports4Page } from './sports4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sports4PageRoutingModule
  ],
  declarations: [Sports4Page]
})
export class Sports4PageModule {}
