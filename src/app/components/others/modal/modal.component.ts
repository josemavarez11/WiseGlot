import { Component, Input, Output, EventEmitter } from '@angular/core';
// Components
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [BtnAuthComponent]
})
export class ModalComponent {
  @Input() message: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  handleButtonClick() {
    this.buttonClick.emit();
  }
}
