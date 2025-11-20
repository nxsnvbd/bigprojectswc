import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
    {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'notif',
    loadChildren: () => import('./notif/notif.module').then( m => m.NotifPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'attendance-admin',
    loadChildren: () => import('./attendance-admin/attendance-admin.module').then( m => m.AttendanceAdminPageModule)
  },
  {
    path: 'attendance-create',
    loadChildren: () => import('./attendance-create/attendance-create.module').then( m => m.AttendanceCreatePageModule)
  },
  {
    path: 'announcement-create',
    loadChildren: () => import('./announcement-create/announcement-create.module').then( m => m.AnnouncementCreatePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'feedback-create',
    loadChildren: () => import('./feedback-create/feedback-create.module').then( m => m.FeedbackCreatePageModule)
  },
  {
    path: 'feedback-details/:id',
    loadChildren: () => import('./feedback-details/feedback-details.module').then( m => m.FeedbackDetailsPageModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then( m => m.MediaPageModule)
  },
  {
    path: 'media-create',
    loadChildren: () => import('./media-create/media-create.module').then( m => m.MediaCreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
