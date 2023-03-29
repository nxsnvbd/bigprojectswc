import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sports1Page } from './sports1.page';

const routes: Routes = [
  {
    path: '',
    component: Sports1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sports1PageRoutingModule {}
