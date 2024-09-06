import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { HomeViewPage } from 'src/app/views/home-view/home-view.page';

@Component({
  selector: 'app-modal-create-decks',
  templateUrl: './modal-create-decks.component.html',
  styleUrls: ['./modal-create-decks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent, LoadingComponent]
})
export class ModalCreateDecksComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() click = new EventEmitter<void>();
  @Output() newDeckAdded = new EventEmitter<any>();
  nameDecks: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private homeViewPage: HomeViewPage
  ) { }

  ngOnInit() {

  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  areFieldsEmpty() {
    return this.nameDecks.trim() === '';
  }

  onInputChange() {
    // Esto provocará una reevaluación del template y, por lo tanto, cambiará el color del botón
  }

  async handleCreateDeck() {
    if (this.nameDecks.trim() == '') return;

    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();

      if (token) {
        const createDeckResponse = await this.createDeck(token, this.nameDecks);
        return this.newDeckAdded.emit(createDeckResponse);
      }

    } catch (error) {
      return console.error(error);
    } finally {
      this.closeModal();
      return this.isLoading = false;
    }
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
}
