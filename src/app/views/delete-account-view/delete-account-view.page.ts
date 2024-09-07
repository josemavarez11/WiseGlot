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
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
// Services
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

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
    LoadingComponent,
    BtnAuthComponent,
    ModalErrorComponent
  ],
})
export class DeleteAccountViewPage implements OnInit {
  confirmationText: string = '';
  isLoading: boolean = false;
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {}

  ngOnInit() {}

  areFieldsEmpty() {
    return this.confirmationText.trim() === '';
  }
  onInputChange() {
    // Esto provocará una reevaluación del template y, por lo tanto, cambiará el color del botón
  }

  async handleDeleteButton() {
    if (this.confirmationText === 'Eliminar mi cuenta') {
      this.isLoading = true;
      try {
        const token = await this.capacitorPreferencesService.getToken();
        if (token) {
          await this.deleteAccount(token);
          this.router.navigate(['/welcome']);
        }
      } catch (error) {
        this.errorDescription = 'Error al eliminar la cuenta';
        this.isModalErrorVisible = true;
        return;
      } finally {
        this.isLoading = false;
      }
    }
  }

  private async deleteAccount(token: string) {
    await this.apiService.delete(
      '/users/delete-user/',
      [['Authorization', `Bearer ${token}`]],
      false
    );

    this.capacitorPreferencesService.clearAll();
  }

  back() {
    this.router.navigate(['/home']);
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
