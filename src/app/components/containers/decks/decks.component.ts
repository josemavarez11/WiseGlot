import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  standalone: true
})
export class DecksComponent  implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  constructor() { }

  ngOnInit() {}

}
