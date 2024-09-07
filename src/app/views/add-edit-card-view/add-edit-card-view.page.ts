import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { CardService } from 'src/services/cardService.service';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';

@Component({
  selector: 'app-add-edit-card-view',
  templateUrl: './add-edit-card-view.page.html',
  styleUrls: ['./add-edit-card-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent, ModalErrorComponent]
})
export class AddEditCardViewPage implements OnInit {
  mode: string = '';
  isLoading: boolean = false;
  deckId: string = '';
  frontSide: string = '';
  backSide: string = '';
  cardId: string = '';
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // 'agregar' es el valor predeterminado
      this.deckId = params['deckId'] || '';
      this.frontSide = params['front'] || '';
      this.backSide = params['back'] || '';
      this.cardId = params['cardId'] || ''; // Suponiendo que pasas el ID de la carta para la edición
    });
  }

  get isButtonDisabled(): boolean {
    return this.mode === 'add' && !(this.frontSide && this.backSide);
  }

  backk() {
    this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId }});
  }

  async handleDoneClick() {
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        if (this.mode === 'add') {
          const createCardResponse = await this.createCard(this.frontSide, this.backSide, token, this.deckId);

          if (createCardResponse.status !== 201) {
            this.errorDescription = 'Error al crear la carta';
            return this.isModalErrorVisible = true;
          }

          this.cardService.emitCardCreated(createCardResponse.data);
          this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId } });
        } else {
          const updateCardResponse = await this.updateCard(this.cardId, this.frontSide, this.backSide, token);

          if (updateCardResponse.status !== 200) {
            this.errorDescription = 'Error al actualizar la carta';
            return this.isModalErrorVisible = true;
          }

          this.cardService.emitCardUpdated(updateCardResponse.data);
          this.router.navigate( ['/inside-deck-view'],{ queryParams: { deckId: this.deckId } });
        }
      } else {
        this.errorDescription = 'Error al obtener el token';
        this.isModalErrorVisible = true;
        this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId } });
      }
    } catch (error) {
      this.errorDescription = 'Error al crear o actualizar la carta';
      this.isModalErrorVisible = true;
    } finally {
      return this.isLoading = false;
    }
  }

  private async createCard(val_card: string, mea_card: string, token: string, id_deck: string) {
    const response = await this.apiService.post(
      '/cards/create-card/',
      { val_card, mea_card, id_deck },
      [['Authorization', `Bearer ${token}`]],
      true
    );

    return response;
  }

  private async updateCard(cardId: string, val_card: string, mea_card: string, token: string) {
    const response = await this.apiService.put(
      `/cards/update-card/${cardId}/`,
      { val_card, mea_card },
      [['Authorization', `Bearer ${token}`]],
      true
    );

    return response;
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
