import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./views/welcome-view/welcome-view.page').then( m => m.WelcomeViewPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login-view/login-view.page').then( m => m.LoginViewPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register-view/register-view.page').then( m => m.RegisterViewPage)
  },
];
