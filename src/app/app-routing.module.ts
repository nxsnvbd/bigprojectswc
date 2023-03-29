import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'men',
    loadChildren: () => import('./men/men.module').then( m => m.MenPageModule)
  },
  {
    path: 'women',
    loadChildren: () => import('./women/women.module').then( m => m.WomenPageModule)
  },
  {
    path: 'kids',
    loadChildren: () => import('./kids/kids.module').then( m => m.KidsPageModule)
  },
  {
    path: 'sports',
    loadChildren: () => import('./sports/sports.module').then( m => m.SportsPageModule)
  },
  {
    path: 'men1',
    loadChildren: () => import('./men1/men1.module').then( m => m.Men1PageModule)
  },
  {
    path: 'men2',
    loadChildren: () => import('./men2/men2.module').then( m => m.Men2PageModule)
  },
  {
    path: 'men3',
    loadChildren: () => import('./men3/men3.module').then( m => m.Men3PageModule)
  },
  {
    path: 'men4',
    loadChildren: () => import('./men4/men4.module').then( m => m.Men4PageModule)
  },
  {
    path: 'women1',
    loadChildren: () => import('./women1/women1.module').then( m => m.Women1PageModule)
  },
  {
    path: 'women2',
    loadChildren: () => import('./women2/women2.module').then( m => m.Women2PageModule)
  },
  {
    path: 'women3',
    loadChildren: () => import('./women3/women3.module').then( m => m.Women3PageModule)
  },
  {
    path: 'women4',
    loadChildren: () => import('./women4/women4.module').then( m => m.Women4PageModule)
  },
  {
    path: 'kids1',
    loadChildren: () => import('./kids1/kids1.module').then( m => m.Kids1PageModule)
  },
  {
    path: 'kids2',
    loadChildren: () => import('./kids2/kids2.module').then( m => m.Kids2PageModule)
  },
  {
    path: 'kids3',
    loadChildren: () => import('./kids3/kids3.module').then( m => m.Kids3PageModule)
  },
  {
    path: 'kids4',
    loadChildren: () => import('./kids4/kids4.module').then( m => m.Kids4PageModule)
  },
  {
    path: 'sports1',
    loadChildren: () => import('./sports1/sports1.module').then( m => m.Sports1PageModule)
  },
  {
    path: 'sports2',
    loadChildren: () => import('./sports2/sports2.module').then( m => m.Sports2PageModule)
  },
  {
    path: 'sports3',
    loadChildren: () => import('./sports3/sports3.module').then( m => m.Sports3PageModule)
  },
  {
    path: 'sports4',
    loadChildren: () => import('./sports4/sports4.module').then( m => m.Sports4PageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
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
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'addtocart',
    loadChildren: () => import('./addtocart/addtocart.module').then( m => m.AddtocartPageModule)
  },
  {
    path: 'notif',
    loadChildren: () => import('./notif/notif.module').then( m => m.NotifPageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
