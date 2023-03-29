import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Women2Page } from './women2.page';

const routes: Routes = [
  {
    path: '',
    component: Women2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Women2PageRoutingModule {}
