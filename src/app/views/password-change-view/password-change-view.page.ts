import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { ModalComponent } from 'src/app/components/others/modal/modal.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { IonContent } from '@ionic/angular/standalone';
// Services
import { ServiceSharedService } from '../../../services/service-shared.service';

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
    LoadingComponent,
    BtnAuthComponent,
  ],
})
export class PasswordChangeViewPage implements OnInit {
  email: string = '';
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  c5: string = '';
  c6: string = '';

  showPassword: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showSuccessModal: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private sharedService: ServiceSharedService) {
    this.email = this.sharedService.getEmail();
    [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6] = this.sharedService.getSecretCode();
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
    console.log('Code:', this.c1, this.c2, this.c3, this.c4, this.c5, this.c6);
    console.log('Email:', this.email);
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
      this.errorMessage = 'Rellene todos los campos';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    try {
      let code = `${this.c1}${this.c2}${this.c3}${this.c4}${this.c5}${this.c6}`;
      const response = await fetch(
        'https://wiseglot-api.onrender.com/auth/reset-password/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            email: this.email,
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
        this.errorMessage = 'Error desconocido. Vuelva a intentarlo más tarde.';
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
