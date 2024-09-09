import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
// Components
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { CardOptionDaySelectorComponent } from 'src/app/components/others/card-option-day-selector/card-option-day-selector.component';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CardService } from 'src/services/cardService.service';

@Component({
  selector: 'app-generate-cards-view',
  templateUrl: './generate-cards-view.page.html',
  styleUrls: ['./generate-cards-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CardOptionDaySelectorComponent,
    LoadingComponent,
    ModalErrorComponent,
  ],
})
export class GenerateCardsViewPage implements OnInit {
  isTextInputSelected = false;
  isSelectInputSelected = false;
  textValue: string = '';
  selectedValue: string = '';
  selectedTopicId: string = '';
  showNewCard: boolean = false;
  isModalVisible = false;
  topics: Array<any> = [];
  numberOfCardsToGenerate: number = 10;
  deckId: string = '';
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService,
    private cardService: CardService
  ) {}

  async ngOnInit() {
    this.updateShowNewCard();

    const topics = await this.capacitorPreferencesService.getAppTopics();
    this.topics = topics ? topics : [];

    this.route.queryParams.subscribe((params) => {
      this.deckId = params['deckId'];
    });
  }

  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('selectInput') selectInput!: ElementRef;

  get isButtonEnabled(): boolean {
    return this.textValue.trim().length > 0 || this.selectedValue.length > 0;
  }

  onCheckboxChange(type: string) {
    if (type === 'text') {
      this.isSelectInputSelected = false;
      this.resetSelectInput();
      setTimeout(() => this.textInput.nativeElement.focus(), 0);
    } else if (type === 'select') {
      this.isTextInputSelected = false;
      setTimeout(() => {
        this.selectInput.nativeElement.focus();
        this.selectInput.nativeElement.click();
      }, 0);
    }
    this.updateShowNewCard();
  }

  onTextInputChange() {
    this.updateShowNewCard();
  }

  onSelectChange() {
    const selectedOption = this.selectInput.nativeElement.options[this.selectInput.nativeElement.selectedIndex];
    const selectedValue = this.selectedValue;
    const selectedId = selectedOption.id;
  
    console.log('Valor seleccionado:', selectedValue);
    console.log('ID de la opción seleccionada:', selectedId);
  
    this.selectedTopicId = selectedId;

    this.updateShowNewCard();
  }

  updateShowNewCard() {
    this.showNewCard = this.isButtonEnabled;
  }

  resetSelectInput() {
    this.selectInput.nativeElement.value = '';
    this.selectedValue = '';
    this.selectInput.nativeElement.options[0].selected = true;
    this.updateShowNewCard();
  }

  async handleDoneClick() {
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();

      if (!token) {
        this.errorDescription = 'Error al obtener el token';
        this.isModalErrorVisible = true;
        return (this.isLoading = false);
      }

      var generateResponse: ApiResponse;
      if (this.isTextInputSelected && this.textValue) {
        generateResponse = await this.generateCardsWithIA(
          token,
          this.deckId,
          this.numberOfCardsToGenerate,
          this.textValue
        );
      } else if (this.isSelectInputSelected && this.selectedValue) {
        console.log('creando cartas con topic: ', this.selectedValue);
        generateResponse = await this.generateCardsWithIA(
          token,
          this.deckId,
          this.numberOfCardsToGenerate,
          undefined,
          this.selectedValue,
          this.selectedTopicId
        );
      } else {
        this.errorDescription = 'Error al generar las cartas';
        return (this.isModalErrorVisible = true);
      }

      if (generateResponse.error) {
        this.errorDescription = generateResponse.error;
        this.isModalErrorVisible = true;
      }

      for (const newCard of generateResponse.data) {
        this.cardService.emitCardCreated(newCard);
      }

      this.router.navigate(['/inside-deck-view'], {
        queryParams: { deckId: this.deckId },
      });
    } catch (error) {
      this.errorDescription = 'Error al generar las cartas';
      this.isModalErrorVisible = true;
    } finally {
      return (this.isLoading = false);
    }
  }

  private async generateCardsWithIA(
token: string, id_deck: string, cards_amount: number, user_prompt?: string, topic?: string, selectedTopicId?: string  ): Promise<any> {
    const response: ApiResponse = await this.apiService.post(
      '/cards/generate-cards-with-ai/',
      { id_deck, cards_amount, user_prompt, topic },
      [['Authorization', `Bearer ${token}`]]
    );

    return response;
  }

  back() {
    this.router.navigate(['/inside-deck-view'], {
      queryParams: { deckId: this.deckId },
    });
  }

  closeModal() {
    this.isModalVisible = false;
  }

  openModal() {
    this.isModalVisible = true;
  }

  // Método para actualizar el número de cartas desde el modal
  onNumberOfCardsChange(newNumberOfCards: number) {
    this.numberOfCardsToGenerate = newNumberOfCards;
  }

  closeModalError() {
    this.isModalErrorVisible = false;
  }
}
