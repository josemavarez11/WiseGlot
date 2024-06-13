import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { ModalSelectionComponent } from 'src/app/components/others/modal-selection/modal-selection.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, BtnAuthComponent, ModalSelectionComponent]
})
export class HomeViewPage implements OnInit {
  showModal: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {}

  handleModalSelection(choice: string) {
    this.showModal = false;
    if (choice === 'volver') {
      this.router.navigate(['/login']);
    }
  }

  handleClick(){
    this.router.navigate(['/login']);
  }
}
