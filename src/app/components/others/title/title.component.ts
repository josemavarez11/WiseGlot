import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true
})
export class TitleComponent  implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  constructor() { }

  ngOnInit() {}

}
