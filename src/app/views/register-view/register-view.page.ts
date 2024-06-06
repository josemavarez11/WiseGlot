import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
// Services
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.page.html',
  styleUrls: ['./register-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule, BtnAuthComponent],
})
export class RegisterViewPage implements OnInit {
  nickname: string = '';
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleClick(): void {
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
    if(this.password.length < 6){
      this.errorMessage = 'Password must be at least 6 characters';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if(this.nickname.length < 3){
      this.errorMessage = 'Nickname must be at least 3 characters';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if(!emailRegex.test(this.email)){
      this.errorMessage = 'Invalid email';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }

    if (this.authService.register(this.nickname, this.email, this.password)) {
      this.router.navigate(['/register-welcome']);
    } else {
      this.errorMessage = 'User already exists';
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
