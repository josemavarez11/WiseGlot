import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
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
    path: 'reset-password',
    loadComponent: () => import('./views/reset-password-view/reset-password-view.page').then( m => m.PasswordChangeViewPage)
  },
  {
    path: 'preferences',
    loadComponent: () => import('./views/preferences-view/preferences-view.page').then( m => m.PreferencesView1Page)
  },
  {
    path: 'validate-secret-code',
    loadComponent: () => import('./views/validate-secret-code/validate-secret-code.page').then( m => m.ValidateSecretCodePage)
  },
  {
    path: 'register-welcome',
    loadComponent: () => import('./views/register-welcome-view/register-welcome-view.page').then( m => m.RegisterWelcomeViewPage)
  },
  {
    path: 'error-wifi',
    loadComponent: () => import('./components/others/modal-error-wifi/modal-error-wifi.component').then( m => m.ModalErrorWifiComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./views/home-view/home-view.page').then( m => m.HomeViewPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'edit',
    loadComponent: () => import('./views/edit-user-data-view/edit-user-data-view.page').then( m => m.EditUserDataViewPage)
  },
  {
    path: 'delete-account',
    loadComponent: () => import('./views/delete-account-view/delete-account-view.page').then( m => m.DeleteAccountViewPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./views/chat-view/chat-view.page').then( m => m.ChatViewPage)
  }






];
