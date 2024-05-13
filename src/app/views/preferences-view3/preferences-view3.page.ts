import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-preferences-view3',
  templateUrl: './preferences-view3.page.html',
  styleUrls: ['./preferences-view3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PreferencesView3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
