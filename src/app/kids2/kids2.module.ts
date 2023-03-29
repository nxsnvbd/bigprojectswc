import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kids2PageRoutingModule } from './kids2-routing.module';

import { Kids2Page } from './kids2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kids2PageRoutingModule
  ],
  declarations: [Kids2Page]
})
export class Kids2PageModule {}
