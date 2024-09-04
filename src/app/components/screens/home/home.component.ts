import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
// Components
import { BtnCardComponent } from '../../buttons/btn-card/btn-card.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnCardComponent]
})
export class HomeComponent  implements OnInit {
  userName: string = '';
  url_profile_pic: string = '';

  constructor(private capacitorPreferencesService: CapacitorPreferencesService) { }

  async ngOnInit() {

    const getUserDataResponse = await this.capacitorPreferencesService.getUserData();
    this.userName = getUserDataResponse ? getUserDataResponse.name : '';
    this.url_profile_pic = getUserDataResponse ? getUserDataResponse.profile_img_url : '';
  }


  proximaVista(){
    console.log('Proxima vista');
  }
}
