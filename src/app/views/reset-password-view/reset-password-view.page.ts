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
import { ApiService, ApiResponse } from 'src/services/api.service';

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './reset-password-view.page.html',
  styleUrls: ['./reset-password-view.page.scss'],
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

  constructor(
    private router: Router,
    private sharedService: ServiceSharedService,
    private apiService: ApiService
  ) {
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

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      return;
    }

    const code = `${this.c1}${this.c2}${this.c3}${this.c4}${this.c5}${this.c6}`;
    await this.resetPassword(code, this.email, this.password)
    return;
  }

  private async resetPassword(code: string, email: string, password: string): Promise<void> {
    try {
      const response: ApiResponse = await this.apiService.post('/auth/reset-password/', {
        code,
        email: email,
        password: password,
      });

      if (response.status === 400) {
        this.showError(response.error || 'Los datos ingresados no son válidos. Por favor, inténtelo de nuevo.');
        return;
      } else if (response.status !== 200) {
        this.showError('Error desconocido. Vuelva a intentarlo más tarde.');
        return;
      } else {
        this.showSuccessModal = true;
        return;
      }
    } catch (error: any) {
      this.showError(error.message);
      return;
    } finally {
      this.isLoading = false;
    }
  }

  private areFieldsValid(): boolean {
    if (!this.password || !this.confirmPassword) {
      this.showError('Rellene todos los campos');
      return false;
    }

    if (this.password.length < 8) {
      this.showError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.showError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    this.toggleErrorMessage();
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
