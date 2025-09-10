import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceCreatePage } from './attendance-create.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceCreatePageRoutingModule {}
