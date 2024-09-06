import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Components
import { BtnOptionCardComponent } from '../../buttons/btn-option-card/btn-option-card.component';
import { LoadingComponent } from '../loading/loading.component';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { DeleteResetModalComponent } from '../delete-reset-modal/delete-reset-modal.component';

@Component({
  selector: 'app-card-option-three',
  templateUrl: './card-option-three.component.html',
  styleUrls: ['./card-option-three.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnOptionCardComponent, LoadingComponent, DeleteResetModalComponent],
})
export class CardOptionThreeComponent implements OnInit {
  @Input() isVisible = false;
  @Input() deckId: string = '';
  @Input() card: any; // Recibir la carta seleccionada como input
  @Output() close = new EventEmitter<void>();
  isModalVisible = false;

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

  handleEdit() {
    if (!this.card || !this.card.front || !this.card.back) {
      console.error('Card data is missing:', this.card);
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
          console.error('Error deleting card:', deleteCardResponse);
          return this.closeModal();
        }

        return this.closeModal();
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      return this.closeModal();
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
    console.log('Freezed');
  }
}
