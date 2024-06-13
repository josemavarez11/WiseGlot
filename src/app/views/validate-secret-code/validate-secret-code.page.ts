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
// Service
import { ServiceSharedService } from '../../../services/service-shared.service';

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

  ngOnInit() {
    this.resetForm();
    console.log('Email: ', this.email);
  }

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

  async handleClick(): Promise<void> {
    this.isLoading = true;

    if (!this.c1 || !this.c2 || !this.c3 || !this.c4 || !this.c5 || !this.c6) {
      this.isLoading = false;
      this.errorMessage = 'Rellene todos los campos';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    const code = this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;

    if (!/^[a-zA-Z0-9]{6}$/.test(code)) {
      this.isLoading = false;
      this.errorMessage = 'Cada campo debe tener un solo carácter alfanumérico';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    try {
      const response = await fetch(
        'https://wiseglot-api.onrender.com/auth/validate-reset-password-code/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email, code }), // Usa el email aquí
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

      this.router.navigate(['/password-change']);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      return this.toggleErrorMessage();
    }

    this.isLoading = false;
    this.sharedService.setSecretCode(this.c1, this.c2, this.c3, this.c4, this.c5, this.c6);
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
