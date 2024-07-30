import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-inside-deck-view',
  templateUrl: './inside-deck-view.page.html',
  styleUrls: ['./inside-deck-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    BtnAuthComponent,
  ],
})
export class InsideDeckViewPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
