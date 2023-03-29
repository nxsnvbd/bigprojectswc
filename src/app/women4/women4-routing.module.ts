import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Women4Page } from './women4.page';

const routes: Routes = [
  {
    path: '',
    component: Women4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Women4PageRoutingModule {}
