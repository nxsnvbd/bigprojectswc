import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Men1PageRoutingModule } from './men1-routing.module';

import { Men1Page } from './men1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Men1PageRoutingModule
  ],
  declarations: [Men1Page]
})
export class Men1PageModule {}
