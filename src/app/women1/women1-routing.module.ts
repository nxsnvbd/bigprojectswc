import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Women1Page } from './women1.page';

const routes: Routes = [
  {
    path: '',
    component: Women1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Women1PageRoutingModule {}
