import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Women3PageRoutingModule } from './women3-routing.module';

import { Women3Page } from './women3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Women3PageRoutingModule
  ],
  declarations: [Women3Page]
})
export class Women3PageModule {}
