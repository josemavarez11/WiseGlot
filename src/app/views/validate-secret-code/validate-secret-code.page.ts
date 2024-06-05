import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
// Componentes
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
// Servicios
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent, CommonModule],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate('500ms ease-in')
      ]),
      transition('* => void', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class ValidateSecretCodePage implements OnInit {
  c1: string = '';
  c2: string = '';
  c3: string = '';
  c4: string = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  readonly errorMessageDisplayTime: number = 3000; // 3000 ms = 3 seconds

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  handleClick(): void {
    console.log('Code:', this.c1, this.c2, this.c3, this.c4);

    if (!this.c1 || !this.c2 || !this.c3 || !this.c4) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.hideErrorMessageAfterTimeout();
      return;
    }

    if (this.authService.validateCode(this.c1, this.c2, this.c3, this.c4)) {
      this.router.navigate(['/password-change']);
    } else {
      this.errorMessage = 'Code is incorrect';
      this.showErrorMessage = true;
      this.hideErrorMessageAfterTimeout();
    }
  }

  private hideErrorMessageAfterTimeout(): void {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, this.errorMessageDisplayTime);
  }
}
