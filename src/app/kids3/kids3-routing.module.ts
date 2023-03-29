import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kids3Page } from './kids3.page';

const routes: Routes = [
  {
    path: '',
    component: Kids3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kids3PageRoutingModule {}
