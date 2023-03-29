import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sports3Page } from './sports3.page';

const routes: Routes = [
  {
    path: '',
    component: Sports3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sports3PageRoutingModule {}
