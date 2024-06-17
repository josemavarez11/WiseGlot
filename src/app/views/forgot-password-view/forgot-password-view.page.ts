import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// Components
import { AskEmailViewComponent } from 'src/app/components/screens/ask-email/ask-email.component';
import { EmailSentViewComponent } from 'src/app/components/screens/email-sent/email-sent.component';
@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.page.html',
  styleUrls: ['./forgot-password-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, IonicModule, AskEmailViewComponent, EmailSentViewComponent]
})
export class ForgotPasswordViewPage implements OnInit {
  step: number = 0;
  constructor() { }

  ngOnInit() {
  }

  // Metodo para cambiar de paso
  selectOption(step: number){
    this.step = step;
  }
}
