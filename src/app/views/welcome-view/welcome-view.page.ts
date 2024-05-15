import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// Components
import { TitleComponent } from 'src/app/components/others/title/title.component';
@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.page.html',
  styleUrls: ['./welcome-view.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, FormsModule, RouterLink, TitleComponent]
})
export class WelcomeViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
