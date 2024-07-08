import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnCardComponent } from '../../buttons/btn-auth/btn-card/btn-card.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnCardComponent]
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}


  proximaVista(){
    console.log('Proxima vista');
  }
}
