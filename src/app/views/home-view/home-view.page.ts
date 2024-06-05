import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

// Components
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, BtnAuthComponent]
})
export class HomeViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleClick(): void {
    this.router.navigate(['/login']);
  }

}
