import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kids3PageRoutingModule } from './kids3-routing.module';

import { Kids3Page } from './kids3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kids3PageRoutingModule
  ],
  declarations: [Kids3Page]
})
export class Kids3PageModule {}
