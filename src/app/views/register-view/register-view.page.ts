import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
// Services
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.page.html',
  styleUrls: ['./register-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule]
})
export class RegisterViewPage implements OnInit {
  nickname: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleClick(): void {
    console.log('Nickname:', this.nickname);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    if (!this.nickname || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.authService.register(this.nickname, this.email, this.password)) {
      this.router.navigate(['/register-welcome']);
    }
  }
}
