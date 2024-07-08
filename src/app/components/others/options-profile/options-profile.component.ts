import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-options-profile',
  templateUrl: './options-profile.component.html',
  styleUrls: ['./options-profile.component.scss'],
  standalone: true
})
export class OptionsProfileComponent  implements OnInit {
  @Input() title: string = '';
  @Input() option: string = '';
  constructor() { }

  ngOnInit() {}

}
