import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-auth',
  templateUrl: './btn-auth.component.html',
  styleUrls: ['./btn-auth.component.scss'],
  standalone: true
})
export class BtnAuthComponent  implements OnInit {
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() textColor: string = '';
  @Input() borderColor: string = '';
  constructor() { }

  ngOnInit() {}

}
