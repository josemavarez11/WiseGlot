import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
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
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';

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
    DeleteResetModalComponent,
    LoadingComponent,
    ModalErrorComponent,
],
})
export class InsideDeckViewPage implements OnInit {
  isModalVisible = false;
  isModalVisibleTwo = false;
  isModalErrorVisible = false;
  showReverso = false;
  deckId: string = '';
  deckName: string = '';
  isLoading: boolean = false;
  cards: Array<any> = [];
  cardsNotStudiedAmount: number = 0;
  cardsToReviewAmount: number = 0;
  cardsNotStudied: Array<any> = [];
  cardsToReview: Array<any> = [];
  selectedCard: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deckId = params['deckId'];
    });

    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const getCardsResponse = await this.getCardsByDeck(this.deckId, token);
        if (getCardsResponse.cards_details.length === 0) this.cards = []; //Añadir mensaje visual de que no hay cartas aún

        for (const card of getCardsResponse.cards_details) {
          this.cards.push({ id: card.id, front: card.val_card, back: card.mea_card });
        }

        this.deckName = getCardsResponse.deck_details.name;
        this.cardsNotStudiedAmount = getCardsResponse.deck_details.cards_not_studied.amount;
        this.cardsToReviewAmount = getCardsResponse.deck_details.cards_to_review.amount;
        this.cardsNotStudied = getCardsResponse.deck_details.cards_not_studied.cards;
        this.cardsToReview = getCardsResponse.deck_details.cards_to_review.cards;
      }
    } catch (error) {
      return console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  toggleVisibility() {
    this.showReverso = !this.showReverso;
  }

  private async getCardsByDeck(deckId: string, token: string): Promise<any> {
    const response: ApiResponse = await this.apiService.get(
      `/cards/get-all-data-by-deck/${deckId}/`,
      [['Authorization', `Bearer ${token}`]]
    );

    return response.data;
  }

  addCard() {
    const newCardNumber = this.cards.length + 1;
    this.cards.push({ front: `Frente ${newCardNumber}`, back: `Reverso ${newCardNumber}` });
  }

  openModal() {
    this.isModalVisible = true;
  }

  openModalTwo(card: any) {
    this.selectedCard = card;
    this.isModalVisibleTwo = true;
    console.log('Front:', card.front);
    console.log('Back:', card.back);

    // Pasar la carta seleccionada al modal
    const modalComponent = new CardOptionThreeComponent(this.router, this.apiService, this.capacitorPreferencesService); // Crea una instancia del modal
    modalComponent.card = card; // Asigna la carta al modal
    modalComponent.isVisible = true; // Muestra el modal
}


  closeModalTwo() {
    this.isModalVisibleTwo = false;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  handleClickAdd() {
    this.router.navigate(['/add-edit-card-view'], { queryParams: { mode: 'agregar', deckId: this.deckId } });
    this.closeModal();
  }
  settings(){
    this.router.navigate(['/deck-settings-view'], { queryParams: { deckId: this.deckId } });
  }
  Study(){
    this.isModalErrorVisible = true;
  }
  closeModalError(){
    this.isModalErrorVisible = false;
  }
}

