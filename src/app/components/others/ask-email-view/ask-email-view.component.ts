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
    private sharedService: ServiceSharedService
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/;

    if (!this.email) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email';
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }

    try {
      const response = await fetch(
        'https://wiseglot-api.onrender.com/auth/send-reset-password-code/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email }),
        }
      );

      if (response.status === 400) {
        this.errorMessage = 'No user associated with this email was found.';
        this.showErrorMessage = true;
        this.isLoading = false;
        return this.toggleErrorMessage();
      }

      if (response.status !== 200) {
        this.errorMessage = 'Unknown error. Try again later.';
        this.showErrorMessage = true;
        this.isLoading = false;
        return this.toggleErrorMessage();
      }

      this.setEmail(this.email); // Asegúrate de llamar a setEmail aquí
      this.selectOption(1);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      this.isLoading = false;
      return this.toggleErrorMessage();
    }
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
