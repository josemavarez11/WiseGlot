import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn-card',
  templateUrl: './btn-card.component.html',
  styleUrls: ['./btn-card.component.scss'],
  standalone: true
})
export class BtnCardComponent  implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  constructor() { }

  ngOnInit() {}

  proximaVista(){
    console.log('Proxima vista');
  }
}
