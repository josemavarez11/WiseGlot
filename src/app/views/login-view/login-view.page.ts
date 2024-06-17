import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
// Services
import { ApiResponse, ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.page.html',
  styleUrls: ['./login-view.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterLink,
    TitleLrComponent,
    MessageErrorComponent,
    CommonModule,
    BtnAuthComponent,
    LoadingComponent,
  ],
})
export class LoginViewPage implements OnInit {
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/login') {
          this.resetForm();
        }
      }
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      return;
    }

    try {
      const response: ApiResponse = await this.apiService.post('/auth/login/', {
        email: this.email,
        password: this.password,
      });

      if (response.status === 400) {
        this.showError('Los datos que ha proporcionado no coinciden con nuestros registros. Por favor, inténtelo de nuevo.');
      } else if (response.status !== 200) {
        this.showError('Error desconocido. Vuelva a intentarlo más tarde.');
      } else {
        const data = response.data;
        await Preferences.set({ key: 'token', value: data.token });
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.showError(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  private areFieldsValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;

    if (!this.email || !this.password) {
      this.showError('Rellene todos los campos');
      return false;
    }
    if (!emailRegex.test(this.email)) {
      this.showError('Dirección de correo electrónico no válida');
      return false;
    }
    if (this.password.length < 6) {
      this.showError('La contraseña debe tener al menos 6 caracteres');
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
}
