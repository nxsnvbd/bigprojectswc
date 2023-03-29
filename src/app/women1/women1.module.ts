import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Women1PageRoutingModule } from './women1-routing.module';

import { Women1Page } from './women1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Women1PageRoutingModule
  ],
  declarations: [Women1Page]
})
export class Women1PageModule {}
