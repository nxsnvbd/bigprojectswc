import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Men4Page } from './men4.page';

const routes: Routes = [
  {
    path: '',
    component: Men4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Men4PageRoutingModule {}
