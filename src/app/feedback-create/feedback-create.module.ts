import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackCreatePageRoutingModule } from './feedback-create-routing.module';

import { FeedbackCreatePage } from './feedback-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackCreatePageRoutingModule
  ],
  declarations: [FeedbackCreatePage]
})
export class FeedbackCreatePageModule {}
