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
// Componentes
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import message from '../../json/messages.json';
// Service
import { ServiceSharedService } from '../../../services/service-shared.service';
import { ApiService, ApiResponse } from 'src/services/api.service';

@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TitleLrComponent,
    MessageErrorComponent,
    CommonModule,
    LoadingComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    BtnAuthComponent,
  ],
})
export class ValidateSecretCodePage implements OnInit {
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  c5: string = '';
  c6: string = '';

  showErrorMessage: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  email: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private sharedService: ServiceSharedService
  ) {
    this.router.events.subscribe((event) =>{
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/validate-secret-code') {
          this.resetForm();
        }
      }
    });
    this.email = this.sharedService.getEmail();
  }

  resetForm(): void {
    this.c1 = '';
    this.c2 = '';
    this.c3 = '';
    this.c4 = '';
    this.c5 = '';
    this.c6 = '';
  };

  validateInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const allowedChars = /^[a-zA-Z0-9]$/;

    if (!allowedChars.test(input.value)) {
      input.value = '';
    }

    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }
  }

  ngOnInit() {
    this.resetForm();
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      this.showError(message.ERROR.EmptyFields);
      return;
    }

    const code = this.getCode();

    if (!this.isCodeValid(code)) {
      this.isLoading = false;
      this.showError(message.ERROR.AlphanumericFields);
      return;
    }

    await this.validateSecretCode(this.email, code);
  }

  private async validateSecretCode(email: string, code: string): Promise<void> {
    try {
      const response: ApiResponse = await this.apiService.post('/auth/validate-reset-password-code/', { email, code });

      if (response.status === 400) {
        this.showError(response.error || message.ERROR.Validation);
        return;
      } else if (response.status !== 200) {
        this.showError(message.ERROR.Unknown);
        return;
      } else {
        this.router.navigate(['/reset-password']);
        this.sharedService.setSecretCode(this.c1, this.c2, this.c3, this.c4, this.c5, this.c6);
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
    return this.c1 && this.c2 && this.c3 && this.c4 && this.c5 && this.c6 ? true : false;
  }

  private getCode(): string {
    return this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;
  }

  private isCodeValid(code: string): boolean {
    return /^[a-zA-Z0-9]{6}$/.test(code);
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
