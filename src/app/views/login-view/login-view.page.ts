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

// Services

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

  constructor(private router: Router) {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;
    if (!this.email || !this.password) {
      this.errorMessage = 'Rellene todos los campos';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      this.isLoading = false;
      return;
    }
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Correo electrónico no válido';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      this.isLoading = false;
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      this.isLoading = false;
      return;
    }
    try {
      const response = await fetch(
        'https://wiseglot-api.onrender.com/auth/login/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        }
      );

      if (response.status === 400) {
        this.errorMessage =
          'Los datos que ha proporcionado no coinciden con nuestros registros. Por favor, inténtelo de nuevo.';
        this.showErrorMessage = true;
        this.toggleErrorMessage();
        this.isLoading = false;
        return;
      }

      if (response.status !== 200) {
        this.errorMessage = 'Error desconocido. Vuelva a intentarlo más tarde.';
        this.showErrorMessage = true;
        this.toggleErrorMessage();
        this.isLoading = false;
        return;
      }

      const data = await response.json();
      console.log(data.token);
      //get and save token
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }
    this.isLoading = false;
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
