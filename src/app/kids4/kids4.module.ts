import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kids4PageRoutingModule } from './kids4-routing.module';

import { Kids4Page } from './kids4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kids4PageRoutingModule
  ],
  declarations: [Kids4Page]
})
export class Kids4PageModule {}
