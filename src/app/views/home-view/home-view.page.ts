import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { ModalSComponent } from 'src/app/components/others/mosalSelection/modalSelection.component';
import { NavbarComponent } from 'src/app/components/others/navbar/navbar.component';
import { HomeComponent } from 'src/app/components/screens/home/home.component';
import { ProfileComponent } from 'src/app/components/screens/profile/profile.component';
import { InputAnimateComponent } from 'src/app/components/buttons/input-animate/input-animate.component';
import { ModalCreateDecksComponent } from 'src/app/components/others/modal-create-decks/modal-create-decks.component';
import { DecksComponent } from 'src/app/components/containers/decks/decks.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
//Services
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { NavBarSelectionService } from 'src/services/nav-bar-selection.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    BtnAuthComponent,
    ModalSComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    InputAnimateComponent,
    ModalCreateDecksComponent,
    DecksComponent,
    RouterLink,
    LoadingComponent,
    ModalErrorComponent
  ],
})
export class HomeViewPage implements OnInit {
  selectedOption: string = 'home';
  isModalVisible = false;
  isLoading: boolean = false;
  decks: Array<any> = [];
  errorDescription: string = '';
  isModalErrorVisible: boolean = false;

  constructor(
    private router: Router,
    private navbarSelectionService: NavBarSelectionService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.navbarSelectionService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
    });

    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const decksResponse = await this.getDecksByUser(token);
        for (const deck of decksResponse) {
          this.decks.push({ id: deck.id, title: deck.nam_deck, description: deck.cards_amount });
        }
      }
    } catch (error) {
      this.errorDescription = 'Error al obtener los mazos';
      this.isModalErrorVisible = true;
    } finally {
      this.isLoading = false;
    }

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      if (navigation.extras.state['deletedDeckId']) {
        console.log('se navegó a decks con un mazo eliminado: ', navigation.extras.state['deletedDeckId']);
        this.handleDeckDeleted(navigation.extras.state['deletedDeckId']);
      }
      if (navigation.extras.state['updatedDeck']) {
        this.handleDeckUpdated(navigation.extras.state['updatedDeck']);
      }
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  handleNewDeckAdded(newDeck: any) {
    this.decks.push({
      id: newDeck.id,
      title: newDeck.nam_deck,
      description: 0,
    });
  }

  handleDeckUpdated(updatedDeck: any) {
    const deckIndex = this.decks.findIndex((deck) => deck.id === updatedDeck.id);
    if (deckIndex !== -1) {
      this.decks[deckIndex] = {
        id: updatedDeck.id,
        title: updatedDeck.nam_deck,
        description: updatedDeck.cards_amount,
      }
    }
  }

  handleDeckDeleted(deckId: string) {
    this.decks = this.decks.filter((deck) => deck.id !== deckId);
  }

  private async getDecksByUser(token: string): Promise<any> {
    const response = await this.apiService.get('/cards/get-decks-by-user/', [['Authorization', `Bearer ${token}`]]);
    return response.data;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
