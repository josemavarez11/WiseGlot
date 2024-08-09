import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
// Components
import { BtnOptionCardComponent } from 'src/app/components/buttons/btn-option-card/btn-option-card.component';
import { DeleteResetModalComponent } from 'src/app/components/others/delete-reset-modal/delete-reset-modal.component';

@Component({
  selector: 'app-deck-settings-view',
  templateUrl: './deck-settings-view.page.html',
  styleUrls: ['./deck-settings-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, BtnOptionCardComponent, DeleteResetModalComponent],
})
export class DeckSettingsViewPage implements OnInit {
  isModalVisible = false;
  isModalVisibleTwo = false;
  constructor() { }

  ngOnInit() {
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
