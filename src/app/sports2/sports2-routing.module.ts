import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sports2Page } from './sports2.page';

const routes: Routes = [
  {
    path: '',
    component: Sports2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sports2PageRoutingModule {}
