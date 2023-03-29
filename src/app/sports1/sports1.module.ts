import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sports1PageRoutingModule } from './sports1-routing.module';

import { Sports1Page } from './sports1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sports1PageRoutingModule
  ],
  declarations: [Sports1Page]
})
export class Sports1PageModule {}
