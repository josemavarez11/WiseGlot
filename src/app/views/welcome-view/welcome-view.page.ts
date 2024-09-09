import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// Components
import { TitleComponent } from 'src/app/components/others/title/title.component';
import { BtnAuthComponent } from 'src/app/components/buttons/btn-auth/btn-auth.component';
@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.page.html',
  styleUrls: ['./welcome-view.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterLink, TitleComponent, BtnAuthComponent]
})
export class WelcomeViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin(event: MouseEvent) {
    this.router.navigate(['/login']);
  }

  onRegister(event: MouseEvent) {
    this.router.navigate(['/register']);
  }
}
