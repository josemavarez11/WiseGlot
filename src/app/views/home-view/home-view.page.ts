import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
// Interfaces
interface Deck {
  title: string;
  description: string;
}
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { ModalSComponent } from 'src/app/components/others/mosalSelection/modalSelection.component';
import { NavbarComponent } from 'src/app/components/others/navbar/navbar.component';
import { HomeComponent } from 'src/app/components/screens/home/home.component';
import { ProfileComponent } from 'src/app/components/screens/profile/profile.component';
import { InputAnimateComponent } from 'src/app/components/buttons/input-animate/input-animate.component';
import { ModalCreateDecksComponent } from 'src/app/components/others/modal-create-decks/modal-create-decks.component';
import { DecksComponent } from 'src/app/components/containers/decks/decks.component';
//Services
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
  ],
})
export class HomeViewPage implements OnInit {
  selectedOption: string = 'home';
  isModalVisible = false;

  decks: Deck[] = [
    { title: 'Deck 1', description: 'Descripción del deck 1' },
    { title: 'Deck 2', description: 'Descripción del deck 2' },
    { title: 'Deck 3', description: 'Descripción del deck 3' },
    { title: 'Deck 4', description: 'Descripción del deck 4' },
  ];
  constructor(
    private router: Router,
    private navbarSelectionService: NavBarSelectionService,
    private capacitorPreferencesService: CapacitorPreferencesService,
  ) {}

  ngOnInit() {
    this.navbarSelectionService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
    });
  }

  handleClick() {
    this.router.navigate(['/login']);
  }

  async handleViewToken() {
    const token = await this.capacitorPreferencesService.getToken();
    console.log(token);
  }
  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
