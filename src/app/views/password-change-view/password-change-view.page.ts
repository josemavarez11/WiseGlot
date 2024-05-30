import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';

@Component({
  selector: 'app-password-change-view',
  templateUrl: './password-change-view.page.html',
  styleUrls: ['./password-change-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, RouterLink, TitleLrComponent, MessageErrorComponent]
})
export class PasswordChangeViewPage implements OnInit {
  // Mostrar u ocultar la contraseña
  showPassword: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
