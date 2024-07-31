import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';

@Component({
  selector: 'app-card-option-box-one',
  templateUrl: './card-option-box-one.component.html',
  styleUrls: ['./card-option-box-one.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnAuthComponent]
})
export class CardOptionBoxOneComponent  implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  handleClick() {
    console.log('click');
  }
}
