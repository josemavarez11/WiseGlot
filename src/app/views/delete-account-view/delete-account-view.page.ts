import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-view',
  templateUrl: './delete-account-view.page.html',
  styleUrls: ['./delete-account-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DeleteAccountViewPage implements OnInit {
  confirmationText: string = '';
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async confirmDeletion() {
    if (this.confirmationText === 'Eliminar mi cuenta') {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: 'Texto correcto. Cuenta eliminada.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    if (this.confirmationText === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, escribe “Eliminar mi cuenta”.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Texto incorrecto. Por favor, escribe “Eliminar mi cuenta”.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  back() {
    this.router.navigate(['/home']);
  }
}
