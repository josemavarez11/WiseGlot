import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import message from '../../json/messages.json'
// Services
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

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

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {
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

  areFieldsEmpty() {
    return this.email.trim() === '' || this.password.trim() === '';
  }

  resetForm(): void {
    this.email = '';
    this.password = '';
  }

  async handleClick(): Promise<any> {
    this.isLoading = true;

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      return;
    }

    const response = await this.login(this.email, this.password);

    if(!response) return;

    const { token } = response;
    await this.capacitorPreferencesService.setToken(token);
    return this.router.navigate(['/home']);
  }

  private async login(email: string, password: string): Promise<any> {
    try {
      const response: ApiResponse = await this.apiService.post('/auth/login/', {
        email,
        password
      });

      if (response.status === 400) {
        this.showError(message.ERROR.InvalidCredentials);
        return;
      } else if (response.status !== 200) {
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

    if (!emailRegex.test(this.email)) {
      this.showError(message.ERROR.InvalidEmail);
      return false;
    }
    if (this.password.length < 6) {
      this.showError(message.ERROR.PasswordExtension);
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
