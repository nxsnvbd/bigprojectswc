import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackCreatePage } from './feedback-create.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackCreatePageRoutingModule {}
