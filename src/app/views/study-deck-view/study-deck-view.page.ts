import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { StudyCardsService } from 'src/services/studyCards.service';

@Component({
  selector: 'app-study-deck-view',
  templateUrl: './study-deck-view.page.html',
  styleUrls: ['./study-deck-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent, ModalErrorComponent]
})
export class StudyDeckViewPage implements OnInit {
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';
  isLoading: boolean = false;
  learningSteps: Array<any> = [];
  deckId: string = '';
  againStep: any = {};
  hardStep: any = {};
  goodStep: any = {};
  easyStep: any = {};
  cardsNotStudied: Array<any> = [];
  cardsToReview: Array<any> = [];
  cardsAlreadyStudied: Array<any> = [];
  cards: Array<any> = [];
  currentCardIndex: number = 0;
  currentCard: any = this.cards[this.currentCardIndex];
  showBack: boolean = false;
  showOptions: boolean = false;
  progressWidth: string = '0%'; // Inicializa la barra de progreso al 0%
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private studyCardsService: StudyCardsService
  ) { }

async ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.deckId = params['deckId'];
  });

  for(let card of this.studyCardsService.cardsNotStudied) this.cards.push(card);
  for(let card of this.studyCardsService.cardsToReview) this.cards.push(card);

  this.currentCard = this.cards[this.currentCardIndex];
  this.updateProgressBar();

  try {
    this.isLoading = true;
    await this.getLearningSteps();

    this.againStep = this.learningSteps.find((step: any) => step.des_learning_step === 'Again')
    this.hardStep = this.learningSteps.find((step: any) => step.des_learning_step === 'Hard')
    this.goodStep = this.learningSteps.find((step: any) => step.des_learning_step === 'Good')
    this.easyStep = this.learningSteps.find((step: any) => step.des_learning_step === 'Easy')
  } catch (error) {
    this.errorDescription = 'Failed to fetch learning steps';
    this.isModalErrorVisible = true;
  } finally {
    this.isLoading = false;
  }
}

  private async getLearningSteps() {
    const response = await this.capacitorPreferencesService.getAppLearningSteps();

    if (response === null) {
      const response = await this.apiService.get('/cards/get-learning-steps/');
      if (response.status === 200) this.learningSteps = response.data;
    } else this.learningSteps = response;
  }

  showBackOfCard() {
    this.showBack = true;
    setTimeout(() => {
      this.showOptions = true;
    }, 2000);
  }

  async selectOption(option: any) {
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();

      if(!token) {
        this.errorDescription = 'Failed to get token';
        this.isModalErrorVisible = true;
        return;
      }

      const reviewResponse = await this.reviewCard(this.currentCard.id, option.id, token);

      if (reviewResponse.error) {
        this.errorDescription = reviewResponse.error;
        this.isModalErrorVisible = true;
        return;
      }

      this.cardsAlreadyStudied.push(this.currentCard);
      console.log('Cartas ya estudiadas: ', this.cardsAlreadyStudied);
      this.goToNextCard();
    } catch (error) {
      this.errorDescription = 'Failed to update card';
      this.isModalErrorVisible = true;
    } finally {
      this.isLoading = false;
    }
  }

  goToNextCard() {
    this.showBack = false;
    this.showOptions = false;
    this.currentCardIndex++;

    if (this.currentCardIndex < this.cards.length) {
      this.currentCard = this.cards[this.currentCardIndex];
      this.updateProgressBar(); // Actualiza la barra de progreso
      this.textInput.nativeElement.value = ''; // Limpia el input
    } else {
      this.updateProgressBar(); // Asegurarse de llenar la barra al 100%
      this.router.navigate(['/deck-completed-animation'], { queryParams: { deckId: this.deckId } });
    }
  }

  updateProgressBar() {
    const progress = ((this.currentCardIndex + 1) / this.cards.length) * 100;
    this.progressWidth = `${progress}%`;
  }

  closeModalError() {
    this.isModalErrorVisible = false;
  }

  goToPreviousCard() {
    // Volver a la carta anterior si no estamos en la primera
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.currentCard = this.cards[this.currentCardIndex];
      this.updateProgressBar();
    }
  }

  activateKeyboard() {
    this.textInput.nativeElement.focus();
  }

  closeStudyDeck(){
    this.router.navigate(['/inside-deck-view']);
  }


  private async reviewCard(cardId: string, id_learning_step: string, token: string): Promise<ApiResponse> {
    const response: ApiResponse = await this.apiService.put(
      `/cards/review-card/${cardId}/`,
      { id_learning_step },
      [['Authorization', `Bearer ${token}`]]
    );

    return response;
  }

  handleXClick() {
    return this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId } });

  }
}


