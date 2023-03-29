import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Men4PageRoutingModule } from './men4-routing.module';

import { Men4Page } from './men4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Men4PageRoutingModule
  ],
  declarations: [Men4Page]
})
export class Men4PageModule {}
