import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Men2Page } from './men2.page';

const routes: Routes = [
  {
    path: '',
    component: Men2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Men2PageRoutingModule {}
