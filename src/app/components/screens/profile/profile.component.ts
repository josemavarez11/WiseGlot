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
  systemLanguage: string = 'Español'
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    const userData = await this.getUserData();
    this.name = userData.nam_user;
    this.email = userData.ema_user;
    this.subscription = 'GRATIS'
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
      }

      return response.data
    } catch (error: any) {
      console.log(error) ////
      return;
    } finally {
      ////
    }
  }

  async handleLogOut() {
    await this.capacitorPreferencesService.deleteToken();
    this.router.navigate(['/login'])
  }

  deleteUser(){
    this.router.navigate(['/delete-account']);
  }
}
