import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';

@Component({
  selector: 'app-edit-user-data-view',
  templateUrl: './edit-user-data-view.page.html',
  styleUrls: ['./edit-user-data-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent]
})
export class EditUserDataViewPage implements OnInit {
  option: string = '';
  title: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private routerBack: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.option = params['option'];
      this.title = params['title'];
    });
  }

  async handleDoneClick(){
    const token = await this.capacitorPreferencesService.getToken();
    if (token) await this.updateData(this.option, this.title, token);
    return this.routerBack.navigate(['/home']);
  }

  private async updateData(option: string, newData: string, token: string) {
    this.isLoading = true;

    let prop;
    if (option === 'Dirección de correo') prop = 'ema_user';
    if (option === 'Nombre') prop = 'nam_user';

    try {
      const response: ApiResponse = await this.apiService.put(
        '/users/update-user/',
        { [prop as string]: newData },
        [['Authorization', `Bearer ${token}`]]
      );

      if (response.error) {
        console.error('Error updating email: ', response.error);
        return;
      }

      return;
    } catch (error) {
      console.error('Error updating email: ', error);
      return;
    } finally {
      this.isLoading = false;
    }
  }

  back(){
    this.routerBack.navigate(['/home']);
  }
}
