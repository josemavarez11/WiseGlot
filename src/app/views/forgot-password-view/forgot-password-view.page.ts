import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// Components


@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.page.html',
  styleUrls: ['./forgot-password-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonicModule]
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
