import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
// Services
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-password-change-view',
  templateUrl: './password-change-view.page.html',
  styleUrls: ['./password-change-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule]
})
export class PasswordChangeViewPage implements OnInit {
  // Mostrar u ocultar la contraseña
  showPassword: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/password-change') {
          this.resetForm();
        }
      }
    });
   }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(): void {
    this.password = '';
    this.confirmPassword = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleClick(): void{
    console.log('Password:', this.password);

    if(!this.password || !this.confirmPassword){
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
    if(this.password !== this.confirmPassword){
      this.errorMessage = 'Passwords do not match';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
      return;
    }
    if(this.authService.changePassword(this.password)){
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Password already exists';
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

