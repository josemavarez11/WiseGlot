import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnOptionCardComponent } from '../../buttons/btn-option-card/btn-option-card.component';

@Component({
  selector: 'app-card-option-three',
  templateUrl: './card-option-three.component.html',
  styleUrls: ['./card-option-three.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnOptionCardComponent],
})
export class CardOptionThreeComponent  implements OnInit {
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
