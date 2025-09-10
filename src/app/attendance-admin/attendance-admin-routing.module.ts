import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceAdminPage } from './attendance-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceAdminPageRoutingModule {}
