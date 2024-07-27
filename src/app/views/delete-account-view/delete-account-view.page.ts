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
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
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
  ],
})
export class DeleteAccountViewPage implements OnInit {
  confirmationText: string = '';
  isLoading: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) {}

  ngOnInit() {}

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
        console.error(error);
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
}
