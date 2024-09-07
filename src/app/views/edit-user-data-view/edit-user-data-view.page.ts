import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';

@Component({
  selector: 'app-edit-user-data-view',
  templateUrl: './edit-user-data-view.page.html',
  styleUrls: ['./edit-user-data-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent, ModalErrorComponent]
})
export class EditUserDataViewPage implements OnInit {
  option: string = '';
  title: string = '';
  isLoading: boolean = false;
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';

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
    try {
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const updateUserResponse = await this.updateUser(this.option, this.title, token);
        const userData = await this.capacitorPreferencesService.getUserData();

        if(updateUserResponse) {
          if(this.option === 'Dirección de correo') userData.email = updateUserResponse.email;
          if(this.option === 'Nombre') userData.name = updateUserResponse.name;
          await this.capacitorPreferencesService.setUserData(userData);
        }
      }
    } catch (error) {
      this.errorDescription = 'Error al actualizar el email';
      this.isModalErrorVisible = true;
    } finally {
      this.isLoading = false;
      return this.routerBack.navigate(['/home']);
    }
  }

  private async updateUser(option: string, newData: string, token: string) {
    let prop;
    if (option === 'Dirección de correo') prop = 'ema_user';
    if (option === 'Nombre') prop = 'nam_user';


    const response: ApiResponse = await this.apiService.put(
      '/users/update-user/',
      { [prop as string]: newData },
      [['Authorization', `Bearer ${token}`]],
      true
    );

    if (response.error) {
      this.errorDescription = 'Error al actualizar el email';
      this.isModalErrorVisible = true;
      return;
    }

    return response.data;
  }

  back(){
    this.routerBack.navigate(['/home']);
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
