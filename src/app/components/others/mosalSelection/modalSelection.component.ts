import { Component, Input, Output, EventEmitter } from '@angular/core';
// Components
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
@Component({
  selector: 'app-modalSelection',
  templateUrl: './modalSelection.component.html',
  styleUrls: ['./modalSelection.component.scss'],
  standalone: true,
  imports: [BtnAuthComponent]
})
export class ModalSComponent {
  @Input() message: string = '';
  @Output() buttonClick = new EventEmitter<string>(); 

  handleButtonClick(buttonType: string) {
    this.buttonClick.emit(buttonType);
  }
}
