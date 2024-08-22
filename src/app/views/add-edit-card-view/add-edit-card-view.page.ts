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
      this.mode = params['mode'] || 'agregar'; // 'agregar' es el valor predeterminado
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
    return this.mode === 'agregar' && !(this.frontSide && this.backSide);
  }

  backk() {
    this.router.navigate(['/inside-deck-view']);
  }

  async handleDoneClick() {
    const token = await this.capacitorPreferencesService.getToken();
    if (token) {
      if (this.mode === 'agregar') {
        const createCardResponse = await this.createCard(this.frontSide, this.backSide, token, this.deckId);

        if (createCardResponse.status !== 201) {
          console.error('Error creating card');
        }

        return this.router.navigate(['/inside-deck-view']);
      } else {
        // Edit card
        return this.router.navigate(['/inside-deck-view']);
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

  private async updateCard(frontSide: string, backSide: string, token: string) {
    // Update card
  }
}
