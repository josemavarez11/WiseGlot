import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-preference',
  templateUrl: './title-preference.component.html',
  styleUrls: ['./title-preference.component.scss'],
  standalone: true
})
export class TitlePreferenceComponent  implements OnInit {
  @Input() title: string = '';
  constructor() { }

  ngOnInit() {}

}
