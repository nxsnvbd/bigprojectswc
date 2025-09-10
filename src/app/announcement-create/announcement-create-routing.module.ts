import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementCreatePage } from './announcement-create.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementCreatePageRoutingModule {}
