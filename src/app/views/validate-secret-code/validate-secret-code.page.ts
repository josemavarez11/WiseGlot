import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
// Componentes
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
// Servicios
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule],
})
export class ValidateSecretCodePage implements OnInit {
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  validateInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const char = event.key;

    // Permitir solo números y asegurar que solo se ingrese un carácter
    if (!/^\d$/.test(char) || input.value.length >= 1) {
      event.preventDefault();
    }
  }

  async handleClick(): Promise<void> {

    if (!this.c1 || !this.c2 || !this.c3 || !this.c4) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    try {
      const code = this.c1 + this.c2 + this.c3 + this.c4;
      const response = await fetch('https://wiseglot-api.onrender.com/auth/validate-reset-password-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: '', code })
      });

      if (response.status === 400) {
        const data = await response.json();
        this.errorMessage = data.error;
        this.showErrorMessage = true;
        return this.toggleErrorMessage();
      }

      if(response.status !== 200) {
        this.errorMessage = 'Unknown error. Try again later.';
        this.showErrorMessage = true;
        return this.toggleErrorMessage();
      }

      this.router.navigate(['/password-change']);

    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      return this.toggleErrorMessage();
    }

    console.log('Code:', this.c1, this.c2, this.c3, this.c4);
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
