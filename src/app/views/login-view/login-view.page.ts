import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
// Components
import { TitleLrComponent } from 'src/app/components/others/title-lr/title-lr.component';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.page.html',
  styleUrls: ['./login-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, TitleLrComponent]
})
export class LoginViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
