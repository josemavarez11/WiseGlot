import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// Components
import { AskEmailViewComponent } from '../../components/others/ask-email-view/ask-email-view.component';
import { EmailSentViewComponent } from 'src/app/components/others/email-sent-view/email-sent-view.component';

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
