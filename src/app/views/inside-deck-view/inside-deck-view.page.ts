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
import { CardService } from 'src/services/cardService.service';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
import { addIcons } from "ionicons";

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
  isEditing: boolean = false;
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
  errorDescription: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private cardService: CardService
  ) {}


  // Funciones para habilitar y deshabilitar la edición del nombre del mazo
  enableEditing() {
    this.isEditing = true;
  }

  disableEditing() {
    this.isEditing = false;
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deckId = params['deckId'];
    });

    this.cardService.cardCreated$.subscribe(newCard => this.handleCardAdded(newCard));
    this.cardService.cardUpdated$.subscribe(updatedCard => this.handleCardUpdated(updatedCard));

    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const getCardsResponse = await this.getCardsByDeck(this.deckId, token);

        if (getCardsResponse.error) {
          this.errorDescription = getCardsResponse.error;
          this.isModalErrorVisible = true;
        }

        if (getCardsResponse.data.cards_amount === 0) this.cards = [];

        for (const card of getCardsResponse.data.cards_details) {
          this.cards.push({ id: card.id, front: card.val_card, back: card.mea_card });
        }

        this.deckName = getCardsResponse.data.deck_details.name;
        this.cardsNotStudiedAmount = getCardsResponse.data.deck_details.cards_not_studied.amount;
        this.cardsToReviewAmount = getCardsResponse.data.deck_details.cards_to_review.amount;
        this.cardsNotStudied = getCardsResponse.data.deck_details.cards_not_studied.cards;
        this.cardsToReview = getCardsResponse.data.deck_details.cards_to_review.cards;
      }
    } catch (error) {
      this.errorDescription = 'Error al obtener las cartas del mazo';
      this.isModalErrorVisible = true;
    } finally {
      const navigation = this.router.getCurrentNavigation();
      if(navigation && navigation.extras.state && navigation.extras.state['resetedDeck']) {
        this.handleDeckReseted();
      }
      return this.isLoading = false;
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

    return response;
  }

  handleDeckDeleted(deckId: string) {
    console.log('Deck deleted: ', deckId);
  }

  navigateToDeckSettings(): void {
    this.router.navigate(['/deck-settings-view'], {
      queryParams: { deckId: this.deckId }
    });
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

    // Pasar la carta seleccionada al modal
    const modalComponent = new CardOptionThreeComponent(this.router, this.apiService, this.capacitorPreferencesService); // Crea una instancia del modal
    modalComponent.card = card; // Asigna la carta al modal
    modalComponent.isVisible = true; // Muestra el modal
  }

  handleCardDeleted(cardId: string) {
    this.cards = this.cards.filter((card) => card.id !== cardId);
  }

  handleCardAdded(card: any) {
    console.log('Card added: ', card);
    this.cards.push({ id: card.id, front: card.val_card, back: card.mea_card });
    this.cardsNotStudied.push(card);
    this.cardsNotStudiedAmount++;
  }

  handleDeckReseted() {
    this.cardsNotStudied = this.cards;
    this.cardsToReview = [];
    this.cardsNotStudiedAmount = this.cards.length;
    this.cardsToReviewAmount = 0;
  }

  handleCardUpdated(card: any) {
    console.log('Card updated: ', card);
    const cardIndex = this.cards.findIndex((c) => c.id === card.id);
    this.cards[cardIndex] = { id: card.id, front: card.val_card, back: card.mea_card };
    this.cardsNotStudied = this.cardsNotStudied.map((c) => c.id === card.id ? card : c);
    this.cardsToReview = this.cardsToReview.map((c) => c.id === card.id ? card : c);
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
    this.router.navigate(['/study-deck-view']);
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }

  // Función para capturar el valor actual del mazo cuando obtiene el foco
  logCurrentValue(event: FocusEvent) {
    console.log('Valor actual:', this.deckName);
  }

  // Función para capturar el valor actualizado cuando se pierde el foco
  logUpdatedValue(event: FocusEvent) {
    const newValue = (event.target as HTMLElement).innerText.trim();
    console.log('Nuevo valor:', newValue);
    this.deckName = newValue; // Actualiza la variable con el nuevo valor
    this.isEditing = false;
  }

  async handleDeckNameUpdated(event: FocusEvent) {
    try {
      this.isLoading = true;
      const newValue = (event.target as HTMLElement).innerText.trim();
      const token = await this.capacitorPreferencesService.getToken();

      if(token) {
        const updateDeckNameResponse = await this.updateDeckName(this.deckId, newValue, token);
        if (updateDeckNameResponse.error) {
          this.errorDescription = updateDeckNameResponse.error;
          this.isModalErrorVisible = true;
        }

        this.deckName = newValue;
        this.router.navigate(['/home'], { state: { updatedDeck: updateDeckNameResponse.data }});
      } else {
        this.errorDescription = 'Error al obtener el token';
        this.isModalErrorVisible = true;
      }

    } catch (error) {
      this.errorDescription = 'Error al actualizar el nombre del mazo';
      this.isModalErrorVisible = true;
    } finally {
      return this.isLoading = false;
    }
  }

  private async updateDeckName(deckId: string, newName: string, token: string): Promise<any> {
    const response: ApiResponse = await this.apiService.put(
      `/cards/update-deck/${deckId}/`,
      { nam_deck: newName },
      [['Authorization', `Bearer ${token}`]]
    );

    return response;
  }
}

