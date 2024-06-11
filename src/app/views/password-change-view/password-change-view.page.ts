import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { ModalComponent } from 'src/app/components/others/modal/modal.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
// Services
import { AuthService } from 'src/services/auth.service';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-password-change-view',
  templateUrl: './password-change-view.page.html',
  styleUrls: ['./password-change-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    FormsModule,
    RouterLink,
    TitleLrComponent,
    MessageErrorComponent,
    CommonModule,
    ModalComponent,
    LoadingComponent
  ],
})
export class PasswordChangeViewPage implements OnInit {
  // Mostrar u ocultar la contraseña
  showPassword: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showSuccessModal: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/password-change') {
          this.resetForm();
        }
      }
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(): void {
    this.password = '';
    this.confirmPassword = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    console.log('Password:', this.password);

    try {
      const response = await fetch(
        'https://wiseglot-api.onrender.com/auth/reset-password/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: '',
            email: '',
            password: this.password,
          }),
        }
      );

      if (response.status === 400) {
        const data = await response.json();
        this.errorMessage = data.error;
        this.showErrorMessage = true;
        this.isLoading = false;
        return this.toggleErrorMessage();
      }

      if (response.status !== 200) {
        this.errorMessage = 'Unknown error. Try again later.';
        this.showErrorMessage = true;
        this.isLoading = false;
        return this.toggleErrorMessage();
      }

      this.showSuccessModal = true;
      return;
    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }

  redirectToLogin() {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }
}
