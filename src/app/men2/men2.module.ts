import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Men2PageRoutingModule } from './men2-routing.module';

import { Men2Page } from './men2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Men2PageRoutingModule
  ],
  declarations: [Men2Page]
})
export class Men2PageModule {}
