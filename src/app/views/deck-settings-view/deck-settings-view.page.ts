import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
// Components
import { BtnOptionCardComponent } from 'src/app/components/buttons/btn-option-card/btn-option-card.component';
import { DeleteResetModalComponent } from 'src/app/components/others/delete-reset-modal/delete-reset-modal.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { CardOptionDaySelectorComponent } from 'src/app/components/others/card-option-day-selector/card-option-day-selector.component';

@Component({
  selector: 'app-deck-settings-view',
  templateUrl: './deck-settings-view.page.html',
  styleUrls: ['./deck-settings-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    BtnOptionCardComponent,
    DeleteResetModalComponent,
    LoadingComponent,
    CardOptionDaySelectorComponent
  ],
})
export class DeckSettingsViewPage implements OnInit {
  isLoading: boolean = false;
  isModalVisible = false;
  isModalVisibleTwo = false;
  // 
  isModalVisibleThree = false;
  isModalVisibleFour = false;
  isModalVisibleFive = false;
  isModalVisibleSix = false;
  deckId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deckId = params['deckId'];
    });
  }

  openModal() {
    this.isModalVisible = true;
  }

  openModalTwo() {
    this.isModalVisibleTwo = true;
  }

  closeModalTwo() {
    this.isModalVisibleTwo = false;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  openModalThree() {
    this.isModalVisibleThree = true;
  }

  openModalFour() {
    this.isModalVisibleFour = true;
  }

  openModalFive() {
    this.isModalVisibleFive = true;
  }

  openModalSix() {
    this.isModalVisibleSix = true;
  }

  closeModalThree() {
    this.isModalVisibleThree = false;
  }

  closeModalFour() {
    this.isModalVisibleFour = false;
  }

  closeModalFive() {
    this.isModalVisibleFive = false;
  }

  closeModalSix() {
    this.isModalVisibleSix = false;
  }

  async handleResetDeck(){
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const resetDeckProgressResponse = await this.resetDeckProgress(this.deckId, token);

        if (resetDeckProgressResponse.status !== 200) console.error('reset', resetDeckProgressResponse);

        this.router.navigate(['/inside-deck-view'], { queryParams: { deckId: this.deckId }}); //esto tiene que llevar a la vista de los mazos
      } else {
        console.error('reset', 'No token');
      }
    } catch (error) {
      console.error('reset', error);
    } finally {
      this.isLoading = false;
      return this.closeModal();
    }

  }

  async handleDeleteDeck(){
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const deleteDeckResponse = await this.deleteDeck(this.deckId, token);

        if (deleteDeckResponse.status !== 204) console.error('delete', deleteDeckResponse);

        this.router.navigate(['/home']); //esto tiene que llevar a la vista de los mazos
      } else {
        console.error('delete', 'No token');
      }
    } catch (error) {
      console.error('delete', error);
    } finally {
      this.isLoading = false;
      return this.closeModal();
    }
  }

  private async resetDeckProgress(deckId: string, token: string) {
    console.log('resetDeckProgress', deckId, token);
    const response: ApiResponse = await this.apiService.get(
      `/cards/reset-deck-progress/${deckId}/`,
      [['Authorization', `Bearer ${token}`]],
      false
    );

    return response;
  }

  private async deleteDeck(deckId: string,  token: string) {
    const response: ApiResponse = await this.apiService.delete(
      `/cards/delete-deck/${deckId}/`,
      [['Authorization', `Bearer ${token}`]],
      false
    );

    return response;
  }
}
