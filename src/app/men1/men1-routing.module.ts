import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Men1Page } from './men1.page';

const routes: Routes = [
  {
    path: '',
    component: Men1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Men1PageRoutingModule {}
