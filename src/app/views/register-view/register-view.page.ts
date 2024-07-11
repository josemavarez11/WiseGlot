import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import message from '../../json/messages.json';
// Services
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.page.html',
  styleUrls: ['./register-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    RouterLink,
    TitleLrComponent,
    MessageErrorComponent,
    CommonModule,
    BtnAuthComponent,
    LoadingComponent,
  ],
})
export class RegisterViewPage implements OnInit {
  fullname: string = '';
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/register') {
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

  areFieldsEmpty() {
    return this.email.trim() === '' || this.password.trim() === '' || this.fullname.trim() === '';
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.fullname = '';
  }

  async handleClick(): Promise<any> {
    this.isLoading = true;

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      return;
    }

    const response = await this.register(this.fullname, this.email, this.password)

    if (!response) return;

    const { token } = response;
    await this.capacitorPreferencesService.setToken(token);
    return this.router.navigate(['/register-welcome']);
  }

  private async register(fullname: string, email: string, password: string): Promise<any> {
    try {
      const response: ApiResponse = await this.apiService.post('/users/create-user/', {
        nam_user: fullname,
        ema_user: email,
        pas_user: password,
      });

      if (response.status === 409) {
        this.showError(message.ERROR.EmailAlreadyRegistered);
        return;
      } else if (response.status === 400) {
        this.showError(message.ERROR.InvalidInputs);
        return;
      } else if (response.status !== 201) {
        this.showError(message.ERROR.Unknown);
        return;
      } else {
        const data = response.data;
        return data;
      }
    } catch (error: any) {
      this.showError(error.message);
      return;
    } finally {
      this.isLoading = false;
    }
  }

  private areFieldsValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;

    if (this.password.length < 6) {
      this.showError(message.ERROR.PasswordExtension);
      return false;
    }
    if (this.fullname.length < 3) {
      this.showError(message.ERROR.NameExtension);
      return false;
    }
    if (!emailRegex.test(this.email)) {
      this.showError(message.ERROR.InvalidEmail);
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
