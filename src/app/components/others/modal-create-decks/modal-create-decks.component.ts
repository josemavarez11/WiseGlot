import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';

@Component({
  selector: 'app-modal-create-decks',
  templateUrl: './modal-create-decks.component.html',
  styleUrls: ['./modal-create-decks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent, LoadingComponent] // Incluye FormsModule en imports
})
export class ModalCreateDecksComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  nameDecks: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  areFieldsEmpty() {
    return this.nameDecks.trim() === '';
  }

  async handleCreateDeck() {
    if (this.nameDecks.trim() !== '') {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();

      if (token) {
        const createDeckResponse = await this.createDeck(token, this.nameDecks);
      }

      this.isLoading = false;
      this.closeModal();
    }
    this.closeModal();
  }

  private async createDeck(token: string, nam_deck: string): Promise<any> {
    const response: ApiResponse = await this.apiService.post(
      '/cards/create-deck/',
      { nam_deck },
      [['Authorization', `Bearer ${token}`]],
      true
    )

    if (response.error) {
      console.error('Error creating deck: ', response.error);
      return;
    }

    return response.data;
  }

  onInputChange() {
    // Esto provocará una reevaluación del template y, por lo tanto, cambiará el color del botón
  }
}
