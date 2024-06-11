import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
// Componentes
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
// Service
import { ServiceSharedService } from 'src/app/service-shared.service';

@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule, LoadingComponent],
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

  constructor(private router: Router, private sharedService: ServiceSharedService) { }

  ngOnInit() {
    this.email = this.sharedService.getEmail();
    console.log('Email:', this.email); // Asegúrate de que esto está imprimiendo el email correctamente
  }

  validateInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    // Permitir solo números y asegurar que solo se ingrese un carácter
    if (input.value.length >= 1) {
      event.preventDefault();
    }
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;
    if (!this.c1 || !this.c2 || !this.c3 || !this.c4 || !this.c5 || !this.c6) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    try {
      const code = this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;
      const response = await fetch('https://wiseglot-api.onrender.com/auth/validate-reset-password-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: this.email, code }) // Usa el email aquí
      });

      if (response.status === 400) {
        const data = await response.json();
        this.errorMessage = data.error;
        this.showErrorMessage = true;
        this.isLoading = false;
        return this.toggleErrorMessage();
      }

      if(response.status !== 200) {
        this.errorMessage = 'Unknown error. Try again later.';
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
    console.log('Code:', this.c1, this.c2, this.c3, this.c4, this.c5, this.c6);
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
