import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Kids2Page } from './kids2.page';

const routes: Routes = [
  {
    path: '',
    component: Kids2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Kids2PageRoutingModule {}
