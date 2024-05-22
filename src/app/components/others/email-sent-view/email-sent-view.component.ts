import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-sent-view',
  templateUrl: './email-sent-view.component.html',
  styleUrls: ['./email-sent-view.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class EmailSentViewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
