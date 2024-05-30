import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button-preference-three',
  templateUrl: './button-preference-three.component.html',
  styleUrls: ['./button-preference-three.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonPreferenceThreeComponent  implements OnInit {
  @Input() img: string = '';
  @Input() job: string = '';
  @Output() selected = new EventEmitter<void>();

  isSelected: boolean = false;
  constructor() { }

  ngOnInit() {}
  
  logValues() {
    this.isSelected = !this.isSelected;
    this.selected.emit();
    console.log('img:', this.img);
    console.log('job:', this.job);
  }
}
