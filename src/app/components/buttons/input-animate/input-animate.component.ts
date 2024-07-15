import { Component, OnInit } from '@angular/core';
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
  inputValue: string = '';
  constructor() { }

  ngOnInit() {}

  onInput(): void {
    // Aquí se puede agregar cualquier lógica adicional al escribir en el input
  }
  sendMessage(): void {
    alert('Mensaje enviado: ' + this.inputValue);
    this.inputValue = '';
  }
}
