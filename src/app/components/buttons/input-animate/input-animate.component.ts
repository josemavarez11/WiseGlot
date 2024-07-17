import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-animate',
  templateUrl: './input-animate.component.html',
  styleUrls: ['./input-animate.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class InputAnimateComponent  implements OnInit {
  message: string = '';
  @Output() send = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onInput(): void {
    // Aquí se puede agregar cualquier lógica adicional al escribir en el input
  }

  onSend(): void {
    if (this.message.trim()) {
      this.send.emit(this.message);
      this.message = '';  // Limpiar el campo de entrada después de enviar
    }
  }
}
