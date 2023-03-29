import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sports2PageRoutingModule } from './sports2-routing.module';

import { Sports2Page } from './sports2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sports2PageRoutingModule
  ],
  declarations: [Sports2Page]
})
export class Sports2PageModule {}
