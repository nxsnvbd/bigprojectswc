import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Women2PageRoutingModule } from './women2-routing.module';

import { Women2Page } from './women2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Women2PageRoutingModule
  ],
  declarations: [Women2Page]
})
export class Women2PageModule {}
