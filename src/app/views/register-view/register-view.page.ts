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
// Services

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
  ],
})
export class RegisterViewPage implements OnInit {
  nickname: string = '';
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {
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
    this.nickname = '';
  }

  async handleClick(): Promise<void> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('Nickname:', this.nickname);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (!this.nickname || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if (this.nickname.length < 3) {
      this.errorMessage = 'Nickname must be at least 3 characters';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    try {
      const response = await fetch(
        'https://wiseglot-api.onrender.com/users/create-user/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nam_user: this.nickname,
            ema_user: this.email,
            pas_user: this.password,
          }),
        }
      );

      if (response.status === 409) {
        this.errorMessage =
          'This email is already registered. Please try again.';
        this.showErrorMessage = true;
        return this.toggleErrorMessage();
      }

      if (response.status === 400) {
        this.errorMessage =
          'The data you provided is not valid. Please try again.';
        this.showErrorMessage = true;
        return this.toggleErrorMessage();
      }

      if (response.status !== 201) {
        this.errorMessage = 'Unknown error. Try again later.';
        this.showErrorMessage = true;
        return this.toggleErrorMessage();
      }

      console.log('Response:', response.status);

      const data = await response.json();
      //get token and save it
      console.log(data.token);
      this.router.navigate(['/register-welcome']);
    } catch (error: any) {
      this.errorMessage = error.message;
      this.showErrorMessage = true;
      this.toggleErrorMessage();
    }
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}
