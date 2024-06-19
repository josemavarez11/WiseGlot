import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular'; // Importar ModalController
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { ModalSComponent } from 'src/app/components/others/mosalSelection/modalSelection.component';
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, BtnAuthComponent, ModalSComponent]
})
export class HomeViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  handleClick(){
    this.router.navigate(['/login']);
  }

  handleViewToken(){
    console.log('View Token');
  }
}
