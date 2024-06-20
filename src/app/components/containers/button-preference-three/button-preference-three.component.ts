import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-preference-three',
  templateUrl: './button-preference-three.component.html',
  styleUrls: ['./button-preference-three.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonPreferenceThreeComponent {
  @Input() img: string = '';
  @Input() job: string = '';
  @Input() topic: any;
  @Output() selected = new EventEmitter<any>();

  isSelected: boolean = false;

  logValues() {
    this.isSelected = !this.isSelected;
    this.selected.emit(this.topic);
  }
}
