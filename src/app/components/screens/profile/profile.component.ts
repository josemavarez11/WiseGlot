import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Components
import { OptionsProfileComponent } from '../../others/options-profile/options-profile.component';
import { OptionProfileSubComponent } from '../../others/option-profile-sub/option-profile-sub.component';
import { LoadingComponent } from '../../others/loading/loading.component';
// Services
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [OptionsProfileComponent, OptionProfileSubComponent, LoadingComponent, CommonModule]
})
export class ProfileComponent  implements OnInit {
  subscription: string = ''
  name: string = ''
  email: string = ''
  profile_img_url: string = ''
  systemLanguage: string = 'Español'
  isLoading: boolean = true;
  isVisibleModal = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      await this.loadUserProfileData();
    } catch (error) {
      return console.error('Error al cargar la información del usuario:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadUserProfileData() {
    var userDataCP;
    this.capacitorPreferencesService.data$.subscribe(async (userData) => {
      userDataCP = JSON.parse(userData)
      if(userDataCP !== null) {
        this.name = userDataCP.name;
        this.email = userDataCP.email;
        this.profile_img_url = userDataCP.profile_img_url;
        this.subscription = userDataCP.subscription.description;
      }
    });

    userDataCP = await this.capacitorPreferencesService.getUserData();

    if (userDataCP !== null) {
      this.name = userDataCP.name;
      this.email = userDataCP.email;
      this.profile_img_url = userDataCP.profile_img_url;
      this.subscription = userDataCP.subscription.description;
    } else {
      const userDataAPI = await this.getUserData();
      if (userDataAPI) {
        this.name = userDataAPI.nam_user;
        this.email = userDataAPI.ema_user;
        this.profile_img_url = userDataAPI.profile_img_url;
        this.subscription = userDataAPI.des_subscription;
      }
    }
  }

  private async getUserData(): Promise<any> {
    const token = await this.capacitorPreferencesService.getToken();
    try {
      const response: ApiResponse = await this.apiService.get('/users/get-user-data/',
        [['Authorization', `Bearer ${token}`]]
      );

      if (response.error) {
        console.log(response.error) ////
        return;
      }

      return response.data
    } catch (error: any) {
      console.log(error) ////
      return;
    }
  }

  deleteUser(){
    this.router.navigate(['/delete-account']);
  }

  private async updateProfileImage(profile_img_url: string): Promise<boolean> {
    try {
      const token = await this.capacitorPreferencesService.getToken();
      if (token) {
        const response = await this.apiService.put(
          '/users/update-user/',
          { profile_img_url },
          [['Authorization', `Bearer ${token}`]],
          false
        );

        if (response.error) {
          console.error(response.error);
          return false;
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async uploadImage(event: any){
    this.isLoading = true;
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);

    try {
      await uploadBytes(imgRef, file);
      const imgURL = await getDownloadURL(imgRef);
      const result = await this.updateProfileImage(imgURL);

      if (!result) {
        console.error('Error al subir la imagen');
        return;
      }

      const userData = await this.capacitorPreferencesService.getUserData();
      userData.profile_img_url = imgURL;
      await this.capacitorPreferencesService.setUserData(userData);

      this.profile_img_url = imgURL;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  navigate(){
    this.router.navigate(['/confirm-log-out-view'])
  }

}
