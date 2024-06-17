import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Components
import { MessageErrorComponent } from '../../containers/message-error/message-error.component';
import { LoadingComponent } from '../loading/loading.component';
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
// Services
import { ServiceSharedService } from '../../../../services/service-shared.service';
import { ApiResponse, ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-ask-email-view',
  templateUrl: './ask-email-view.component.html',
  styleUrls: ['./ask-email-view.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    MessageErrorComponent,
    CommonModule,
    FormsModule,
    LoadingComponent,
    BtnAuthComponent,
  ],
})
export class AskEmailViewComponent implements OnInit {
  @Output() stepChange = new EventEmitter<number>();
  email: string = '';
  errorMessage: string = '';
  showErrorMessage: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private sharedService: ServiceSharedService,
    private apiService: ApiService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/ask-email') {
          this.resetForm();
        }
      }
    });
  }

  setEmail(email: string) {
    this.sharedService.setEmail(email);
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(): void {
    this.email = '';
  }

  selectOption(step: number) {
    this.stepChange.emit(step);
  }

  async handleClick(): Promise<void> {
    this.isLoading = true;

    if (!this.isEmailValid()) {
      this.isLoading = false;
      return;
    }

    await this.sendEmailAsked(this.email);
    return;
  }

  private async sendEmailAsked(email: string): Promise<void> {
    try {
      const response: ApiResponse = await this.apiService.post('/auth/send-reset-password-code/', { email });

      if (response.status === 400) {
        this.showError('No se ha encontrado ningún usuario asociado a este correo electrónico.');
        return;
      } else if (response.status !== 200) {
        this.showError('Error desconocido. Vuelva a intentarlo más tarde.');
        return;
      } else {
        this.setEmail(this.email);
        this.selectOption(1);
        return;
      }
    } catch (error: any) {
      this.showError(error.message);
      return;
    } finally {
      this.isLoading = false;
      return;
    }
  }

  private isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;

    if (!this.email) {
      this.showError('Rellene todos los campos');
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
