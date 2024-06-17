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
// Services
import { ApiService, ApiResponse } from 'src/services/api.service';

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

  constructor(private router: Router, private apiService: ApiService) {
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

  resetForm(): void {
    this.email = '';
    this.password = '';
    this.fullname = '';
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;

    if (!this.areFieldsValid()) {
      this.isLoading = false;
      return;
    }

    try {
      const response: ApiResponse = await this.apiService.post('/users/create-user/', {
        nam_user: this.fullname,
        ema_user: this.email,
        pas_user: this.password,
      });

      if (response.status === 409) {
        this.showError('Este correo electrónico ya está registrado. Por favor, inténtelo de nuevo.');
      } else if (response.status === 400) {
        this.showError('Los datos ingresados no son válidos. Por favor, inténtelo de nuevo.');
      } else if (response.status !== 201) {
        this.showError('Error desconocido. Vuelva a intentarlo más tarde.');
      } else {
        const data = response.data;
        //save token
        console.log(data.token);
        this.router.navigate(['/register-welcome']);
      }
    } catch (error: any) {
      this.showError(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  private areFieldsValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;

    if (!this.fullname || !this.email || !this.password) {
      this.showError('Rellene todos los campos');
      return false;
    }
    if (this.password.length < 6) {
      this.showError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (this.fullname.length < 3) {
      this.showError('El nombre debe tener al menos 3 caracteres');
      return false;
    }
    if (!emailRegex.test(this.email)) {
      this.showError('Dirección de correo electrónico no válida');
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
