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

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const userData = await this.getUserData();
    this.name = userData.nam_user;
    this.email = userData.ema_user;
    this.profile_img_url = userData.profile_img_url;
    this.subscription = userData.des_subscription;
    this.isLoading = false;
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

  async handleLogOut() {
    await this.capacitorPreferencesService.deleteToken();
    this.router.navigate(['/login'])
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

      this.profile_img_url = imgURL;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
