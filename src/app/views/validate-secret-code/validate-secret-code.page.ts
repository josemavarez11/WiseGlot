import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
// Componets
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
// Services
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule]
})
export class ValidateSecretCodePage implements OnInit {
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleClick(): void{
    console.log('Code:', this.c1, this.c2, this.c3, this.c4);

    if (!this.c1 || !this.c2 || !this.c3 || !this.c4) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      return;
    }
    if (this.authService.validateCode(this.c1, this.c2, this.c3, this.c4)) {
      this.router.navigate(['/password-change'])
    } else {
      this.errorMessage = 'Code is incorrect';
      this.showErrorMessage = true;
    }
  }

}
