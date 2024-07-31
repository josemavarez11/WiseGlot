import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { CardOptionBoxOneComponent } from 'src/app/components/others/card-option-box-one/card-option-box-one.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-inside-deck-view',
  templateUrl: './inside-deck-view.page.html',
  styleUrls: ['./inside-deck-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    BtnAuthComponent,
    CardOptionBoxOneComponent,
  ],
})
export class InsideDeckViewPage implements OnInit {
  isModalVisible = false;
  constructor() {}

  ngOnInit() {}

  showReverso = false;
  cards = [
    { front: 'Frente A', back: 'Reverso A' },
    { front: 'Frente B', back: 'Reverso B' }
  ];

  toggleVisibility() {
    this.showReverso = !this.showReverso;
  }

  addCard() {
    const newCardNumber = this.cards.length + 1;
    this.cards.push({ front: `Frente ${newCardNumber}`, back: `Reverso ${newCardNumber}` });
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}

