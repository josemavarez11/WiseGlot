import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { RouterLink } from '@angular/router';
// Components
import { MessageErrorComponent } from '../../containers/message-error/message-error.component';

@Component({
  selector: 'app-ask-email-view',
  templateUrl: './ask-email-view.component.html',
  styleUrls: ['./ask-email-view.component.scss'],
  standalone: true,
  imports: [RouterLink, MessageErrorComponent]
})
export class AskEmailViewComponent implements OnInit {
  @Output() stepChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  // Metodo para cambiar de paso
  selectOption(step: number){
    this.stepChange.emit(step);
  }
}
