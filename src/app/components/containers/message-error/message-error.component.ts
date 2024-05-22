import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  standalone: true
})
export class MessageErrorComponent  implements OnInit {
  @Input() descrip: string = ''
  constructor() { }

  ngOnInit() {}

}
