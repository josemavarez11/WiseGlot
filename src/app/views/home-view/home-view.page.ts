import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { ModalSComponent } from 'src/app/components/others/mosalSelection/modalSelection.component';
import { NavbarComponent } from 'src/app/components/others/navbar/navbar.component';
import { NavBarSelectionService } from 'src/services/nav-bar-selection.service';
//Services
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, BtnAuthComponent, ModalSComponent, NavbarComponent]
})
export class HomeViewPage implements OnInit {
  selectedOption: string = 'home';
  constructor(
    private router: Router,
    private navbarSelectionService: NavBarSelectionService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) { }

  ngOnInit() {
      this.navbarSelectionService.selectedOption$.subscribe(option => {
        this.selectedOption = option;
      });
  }

  handleClick(){
    this.router.navigate(['/login']);
  }

  async handleViewToken(){
    const token = await this.capacitorPreferencesService.getToken();
    console.log(token);
  }
}
