import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
// Services
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.page.html',
  styleUrls: ['./login-view.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule, BtnAuthComponent]
})
export class LoginViewPage implements OnInit {
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async handleClick(): Promise<void> {

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    try {
      const response = await fetch('https://wiseglot-api.onrender.com/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      console.log('Email:', this.email);
      console.log('Password:', this.password);
      console.log('Response status:', response.status);

      if(response.status === 404 || response.status === 401) {
        this.errorMessage = 'The data you provided doesn\'t match our records. Please try again.';
        this.showErrorMessage = true;
        this.toggleErrorMessage();
      }

      console.log('test1')

      if(response.status !== 200 ) {
        this.errorMessage = 'Unknown error. Try again later.';
        this.showErrorMessage = true;
        this.toggleErrorMessage();
      }

      const data = await response.json();
      this.router.navigate(['/home']);

    } catch (error: any) {
      console.log(error.message)
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
