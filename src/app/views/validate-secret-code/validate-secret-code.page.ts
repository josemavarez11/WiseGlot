import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
// Componets
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
import { MessageErrorComponent } from 'src/app/components/containers/message-error/message-error.component';
@Component({
  selector: 'app-validate-secret-code',
  templateUrl: './validate-secret-code.page.html',
  styleUrls: ['./validate-secret-code.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, TitleLrComponent,MessageErrorComponent]
})
export class ValidateSecretCodePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
