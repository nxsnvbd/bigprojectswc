import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Women4PageRoutingModule } from './women4-routing.module';

import { Women4Page } from './women4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Women4PageRoutingModule
  ],
  declarations: [Women4Page]
})
export class Women4PageModule {}
