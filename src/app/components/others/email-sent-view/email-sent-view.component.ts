import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-sent-view',
  templateUrl: './email-sent-view.component.html',
  styleUrls: ['./email-sent-view.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class EmailSentViewComponent  implements OnInit {
  @Output() stepChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

    // Metodo para cambiar de paso
    selectOption(step: number){
      this.stepChange.emit(step);
    }

}
