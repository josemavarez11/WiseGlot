import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { CardOptionBoxOneComponent } from 'src/app/components/others/card-option-box-one/card-option-box-one.component';
import { CardOptionBoxTwoComponent } from 'src/app/components/others/card-option-box-two/card-option-box-two.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CardOptionDaySelectorComponent } from "../../components/others/card-option-day-selector/card-option-day-selector.component";
import { CardOptionThreeComponent } from 'src/app/components/others/card-option-three/card-option-three.component';
import { DeleteResetModalComponent } from 'src/app/components/others/delete-reset-modal/delete-reset-modal.component';

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
    CardOptionBoxTwoComponent,
    CardOptionDaySelectorComponent,
    CardOptionThreeComponent,
    DeleteResetModalComponent
],
})
export class InsideDeckViewPage implements OnInit {
  isModalVisible = false;
  isModalVisibleTwo = false;
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

  openModalTwo() {
    this.isModalVisibleTwo = true;
  }

  closeModalTwo() {
    this.isModalVisibleTwo = false;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  resetear(){

  }
  delete(){
    
  }
}

