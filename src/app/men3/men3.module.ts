import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Men3PageRoutingModule } from './men3-routing.module';

import { Men3Page } from './men3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Men3PageRoutingModule
  ],
  declarations: [Men3Page]
})
export class Men3PageModule {}
