import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';


@Component({
  selector: 'app-register-welcome-view',
  templateUrl: './register-welcome-view.page.html',
  styleUrls: ['./register-welcome-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TitleLrComponent, RouterLink]
})
export class RegisterWelcomeViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateComponent() {
    this.router.navigate(['/preferences-view1']);
  }
}
