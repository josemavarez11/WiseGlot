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
    const getUserNameResponse = await this.capacitorPreferencesService.getUserName();
    this.userName = getUserNameResponse ? getUserNameResponse : '';
    const getUrlProfilePicResponse = await this.capacitorPreferencesService.getUserURLProfilePic();
    this.url_profile_pic = getUrlProfilePicResponse ? getUrlProfilePicResponse : '';
  }


  proximaVista(){
    console.log('Proxima vista');
  }
}
