import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnOptionCardComponent } from '../../buttons/btn-option-card/btn-option-card.component';

@Component({
  selector: 'app-card-option-box-two',
  templateUrl: './card-option-box-two.component.html',
  styleUrls: ['./card-option-box-two.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnOptionCardComponent],
})
export class CardOptionBoxTwoComponent  implements OnInit {
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

