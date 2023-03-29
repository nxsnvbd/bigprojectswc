import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Kids1PageRoutingModule } from './kids1-routing.module';

import { Kids1Page } from './kids1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Kids1PageRoutingModule
  ],
  declarations: [Kids1Page]
})
export class Kids1PageModule {}
