import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnOptionCardComponent } from '../../buttons/btn-option-card/btn-option-card.component';

@Component({
  selector: 'app-delete-reset-modal',
  templateUrl: './delete-reset-modal.component.html',
  styleUrls: ['./delete-reset-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnOptionCardComponent],
})
export class DeleteResetModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>(); // Nueva propiedad para emitir el evento de acción
  @Input() title = '';
  @Input() option = '';

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  executeAction() {
    this.action.emit(); // Emitir el evento de acción
    this.isVisible = false;
  }
}
