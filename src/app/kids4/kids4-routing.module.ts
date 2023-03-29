import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kids4Page } from './kids4.page';

const routes: Routes = [
  {
    path: '',
    component: Kids4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kids4PageRoutingModule {}
