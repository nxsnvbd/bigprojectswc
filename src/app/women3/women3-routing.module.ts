import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Women3Page } from './women3.page';

const routes: Routes = [
  {
    path: '',
    component: Women3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Women3PageRoutingModule {}
