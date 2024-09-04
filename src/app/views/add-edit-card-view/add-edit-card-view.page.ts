import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-add-edit-card-view',
  templateUrl: './add-edit-card-view.page.html',
  styleUrls: ['./add-edit-card-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddEditCardViewPage implements OnInit {
  mode: string = '';
  deckId: string = '';
  frontSide: string = '';
  backSide: string = '';
  cardId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'add'; // 'agregar' es el valor predeterminado
      this.deckId = params['deckId'] || '';
      this.frontSide = params['front'] || '';
      this.backSide = params['back'] || '';
      this.cardId = params['cardId'] || ''; // Suponiendo que pasas el ID de la carta para la edición

      console.log('Mode:', this.mode);
      console.log('Deck ID:', this.deckId);
      console.log('Front:', this.frontSide);
      console.log('Back:', this.backSide);
    });
  }

  get isButtonDisabled(): boolean {
    return this.mode === 'add' && !(this.frontSide && this.backSide);
  }

  backk() {
    this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId }});
  }

  async handleDoneClick() {
    const token = await this.capacitorPreferencesService.getToken();
    if (token) {
      if (this.mode === 'add') {
        const createCardResponse = await this.createCard(this.frontSide, this.backSide, token, this.deckId);

        if (createCardResponse.status !== 201) {
          console.error('Error creating card');
        }

        return this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId }});
      } else {
        const updateCardResponse = await this.updateCard(this.frontSide, this.backSide, token);

        if (updateCardResponse.status !== 200) {
          console.error('Error updating card');
        }

        return this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId }});
      }
    } else {
      console.error('No token found');
      return this.router.navigate(['/login']);
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

  private async updateCard(val_card: string, mea_card: string, token: string) {
    const response = await this.apiService.put(
      `/cards/update-card/${this.cardId}/`,
      { val_card, mea_card },
      [['Authorization', `Bearer ${token}`]],
      true
    );

    return response;
  }
}
