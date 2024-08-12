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
    path: 'preferences-view',
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
    path: 'edit-view',
    loadComponent: () => import('./views/edit-user-data-view/edit-user-data-view.page').then( m => m.EditUserDataViewPage)
  },
  {
    path: 'delete-account',
    loadComponent: () => import('./views/delete-account-view/delete-account-view.page').then( m => m.DeleteAccountViewPage)
  },
  {
    path: 'chat-view',
    loadComponent: () => import('./views/chat-view/chat-view.page').then( m => m.ChatViewPage)
  },
  {
    path: 'inside-deck-view',
    loadComponent: () => import('./views/inside-deck-view/inside-deck-view.page').then( m => m.InsideDeckViewPage)
  },
  {
    path: 'add-edit-card-view',
    loadComponent: () => import('./views/add-edit-card-view/add-edit-card-view.page').then( m => m.AddEditCardViewPage)
  },
  {
    path: 'generate-cards-view',
    loadComponent: () => import('./views/generate-cards-view/generate-cards-view.page').then( m => m.GenerateCardsViewPage)
  },
  {
    path: 'deck-settings-view',
    loadComponent: () => import('./views/deck-settings-view/deck-settings-view.page').then( m => m.DeckSettingsViewPage)
  },
  {
    path: 'deck-completed-animation',
    loadComponent: () => import('./views/deck-completed-animation/deck-completed-animation.page').then( m => m.DeckCompletedAnimationPage)
  },
  {
    path: 'study-deck-view',
    loadComponent: () => import('./views/study-deck-view/study-deck-view.page').then( m => m.StudyDeckViewPage)
  }












];
