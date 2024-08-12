import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';

@Component({
  selector: 'app-deck-completed-animation',
  templateUrl: './deck-completed-animation.page.html',
  styleUrls: ['./deck-completed-animation.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, TitleLrComponent, RouterLink]
})
export class DeckCompletedAnimationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  precess() {
    this.router.navigate(['/home']);
  }
}
