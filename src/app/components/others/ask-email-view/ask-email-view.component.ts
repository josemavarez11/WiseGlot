import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Components
import { MessageErrorComponent } from '../../containers/message-error/message-error.component';
@Component({
  selector: 'app-ask-email-view',
  templateUrl: './ask-email-view.component.html',
  styleUrls: ['./ask-email-view.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, MessageErrorComponent]
})
export class AskEmailViewComponent  implements OnInit {
  step: number = 0;
  constructor() { }

  ngOnInit() {}

  // Metodo para cambiar de paso
  selectOption(step: number){
    this.step = step;
  }
}
