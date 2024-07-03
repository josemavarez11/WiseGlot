import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-button-preferences-two',
  templateUrl: './button-preferences-two.component.html',
  styleUrls: ['./button-preferences-two.component.scss'],
  standalone: true
})
export class ButtonPreferencesTwoComponent  implements OnInit {
  @Input() img: string = '';
  @Input() job: string = '';
  @Input() rute: string = '';
  @Output() selected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  logValues() {
    this.selected.emit();
  }
}
