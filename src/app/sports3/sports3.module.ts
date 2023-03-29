import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sports3PageRoutingModule } from './sports3-routing.module';

import { Sports3Page } from './sports3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sports3PageRoutingModule
  ],
  declarations: [Sports3Page]
})
export class Sports3PageModule {}
