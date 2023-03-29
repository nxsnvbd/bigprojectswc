import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kids1Page } from './kids1.page';

const routes: Routes = [
  {
    path: '',
    component: Kids1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kids1PageRoutingModule {}
