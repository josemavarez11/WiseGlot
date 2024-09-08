import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

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
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;

  cards: Array<any> = [
    { front: 'Front 1', back: 'Back 1' },
    { front: 'Front 2', back: 'Back 2' },
    { front: 'Front 3', back: 'Back 3' },
    { front: 'Front 4', back: 'Back 4' },
    { front: 'Front 5', back: 'Back 5' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 7', back: 'Back 7' },
    { front: 'Front 8', back: 'Back 8' },
    { front: 'Front 9', back: 'Back 9' },
    { front: 'Front 10', back: 'Back 10' },
    // Agrega más cartas según sea necesario
  ];
  currentCardIndex: number = 0;
  currentCard: any = this.cards[this.currentCardIndex];
  showBack: boolean = false;
  showOptions: boolean = false;
  progressWidth: string = '0%'; // Inicializa la barra de progreso al 0%

  constructor(
    private router: Router,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    // Inicializa la primera carta
    this.currentCard = this.cards[this.currentCardIndex];
    this.updateProgressBar(); // Actualiza la barra al cargar la primera carta

    try {
      this.isLoading = true;
      await this.getLearningSteps();
      console.log(this.learningSteps);
    } catch (error) {
      this.errorDescription = 'Failed to fetch learning steps';
      this.isModalErrorVisible = true;
    } finally {
      return this.isLoading = false;
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

  selectOption(option: string) {
    console.log('Opción seleccionada:', option);
    this.goToNextCard();
  }

  goToNextCard() {
    this.showBack = false;
    this.showOptions = false;
    this.currentCardIndex++;

    if (this.currentCardIndex < this.cards.length) {
      this.currentCard = this.cards[this.currentCardIndex];
      this.updateProgressBar(); // Actualiza la barra de progreso
    } else {
      this.updateProgressBar(); // Asegurarse de llenar la barra al 100%
      this.router.navigate(['/deck-completed-animation']);
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
}

