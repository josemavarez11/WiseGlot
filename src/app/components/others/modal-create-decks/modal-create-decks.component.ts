import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';

@Component({
  selector: 'app-modal-create-decks',
  templateUrl: './modal-create-decks.component.html',
  styleUrls: ['./modal-create-decks.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent] // Incluye FormsModule en imports
})
export class ModalCreateDecksComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  nameDecks: string = '';

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  areFieldsEmpty() {
    return this.nameDecks.trim() === '';
  }

  onInputChange() {
    // Esto provocará una reevaluación del template y, por lo tanto, cambiará el color del botón
  }

  handleClick() {
    console.log('click');
  }
}
