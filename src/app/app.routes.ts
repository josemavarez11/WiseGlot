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
  {
    path: 'forgot-password',
    loadComponent: () => import('./views/forgot-password-view/forgot-password-view.page').then( m => m.ForgotPasswordViewPage)
  },
  {
    path: 'password-change',
    loadComponent: () => import('./views/password-change-view/password-change-view.page').then( m => m.PasswordChangeViewPage)
  },
  {
    path: 'send-email',
    loadComponent: () => import('./views/send-email-view/send-email-view.page').then( m => m.SendEmailViewPage)
  },
  {
    path: 'preferences-view1',
    loadComponent: () => import('./views/preferences-view1/preferences-view1.page').then( m => m.PreferencesView1Page)
  },
];
