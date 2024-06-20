import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-lr',
  templateUrl: './title-lr.component.html',
  styleUrls: ['./title-lr.component.scss'],
  standalone: true
})
export class TitleLrComponent  implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() width: string = '';
  constructor() { }

  ngOnInit() {}

}
