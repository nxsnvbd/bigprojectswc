import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sports4Page } from './sports4.page';

const routes: Routes = [
  {
    path: '',
    component: Sports4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sports4PageRoutingModule {}
