import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Men3Page } from './men3.page';

const routes: Routes = [
  {
    path: '',
    component: Men3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Men3PageRoutingModule {}
