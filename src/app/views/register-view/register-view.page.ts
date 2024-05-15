import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.page.html',
  styleUrls: ['./register-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, TitleLrComponent]
})
export class RegisterViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
