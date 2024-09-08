import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Components
import { BtnOptionCardComponent } from '../../buttons/btn-option-card/btn-option-card.component';
import { LoadingComponent } from '../loading/loading.component';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { DeleteResetModalComponent } from '../delete-reset-modal/delete-reset-modal.component';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';

@Component({
  selector: 'app-card-option-three',
  templateUrl: './card-option-three.component.html',
  styleUrls: ['./card-option-three.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnOptionCardComponent, LoadingComponent, DeleteResetModalComponent, ModalErrorComponent],
})
export class CardOptionThreeComponent implements OnInit {
  @Input() isVisible = false;
  @Input() deckId: string = '';
  @Input() card: any; // Recibir la carta seleccionada como input
  @Output() close = new EventEmitter<void>();
  isModalVisible = false;
  isModalErrorVisible = false;
  isModalErrorVisibleTwo = false;
  errorDescription: string = '';

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
  closeModalTwo() {
    this.isModalVisible = false;
  }

  closeModalErrorTwo(){
    this.isModalErrorVisibleTwo = false;
  }

  handleEdit() {
    if (!this.card || !this.card.front || !this.card.back) {
      this.errorDescription = 'Error: Los datos de la carta no se encontraron';
      this.isModalErrorVisible = true;
      return;
    }

    this.router.navigate(['/add-edit-card-view'], {
      queryParams: {
        mode: 'edit',
        cardId: this.card.id,
        front: this.card.front,
        back: this.card.back,
      },
    });
  }

  private async deleteCard(token: string) {
    const response: ApiResponse = await this.apiService.delete(
      `/cards/delete-card/${this.card.id}/`,
      [[`Authorization`, `Bearer ${token}`]],
    );

    return response;
  }

  async handleDelete() {
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const deleteCardResponse = await this.deleteCard(token);

        if(deleteCardResponse.status !== 204) {
          this.errorDescription = 'Error al eliminar la carta';
          this.isModalErrorVisible = true;
        }
      }
    } catch (error) {
      this.errorDescription = 'Error al eliminar la carta';
      this.isModalErrorVisible = true;
    } finally {
      this.isLoading = false;
      return this.closeModal();
    }
  }

  handleDeleteModal(){
    this.isModalVisible = true;
  }

  handleSelect() {
    console.log('Selected');
  }

  handleFreeze() {
    this.isModalErrorVisibleTwo = true;
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
