import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-option-day-selector',
  templateUrl: './card-option-day-selector.component.html',
  styleUrls: ['./card-option-day-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent]
})
export class CardOptionDaySelectorComponent implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<number>();
  @Input() title: string = '';
  @Input() value: number = 10;
  @Input() valueType: string = 'cartas';
  @Input() subTitle: string = '';

  isCustomInput: boolean = false; // Variable para controlar el modo personalizado
  private adjustInterval: any;
  private adjustSpeed: number = 200; // Velocidad inicial en milisegundos

  constructor(private router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  handleClickGenerate(){
    this.router.navigate(['/generate-cards-view']);
    this.closeModal();
  }

  // Incrementa el número de cartas
  increaseNumber() {
    this.value++;
  }

  // Disminuye el número de cartas
  decreaseNumber() {
    if (this.value > 0) {
      this.value--;
    }
  }

  // Inicia el incremento rápido al mantener presionado el botón táctil
  startIncreasing() {
    this.increaseNumber();
    this.adjustInterval = setInterval(() => {
      this.increaseNumber();
    }, this.adjustSpeed);
  }

  // Inicia la disminución rápida al mantener presionado el botón táctil
  startDecreasing() {
    this.decreaseNumber();
    this.adjustInterval = setInterval(() => {
      this.decreaseNumber();
    }, this.adjustSpeed);
  }

  // Detiene el ajuste cuando se suelta el dedo o el evento se cancela
  stopAdjusting() {
    clearInterval(this.adjustInterval);
  }

  // Alterna el modo personalizado para habilitar o deshabilitar la edición manual
  toggleCustomInput() {
    this.isCustomInput = !this.isCustomInput;
  }

  save() {
    console.log('Número de cartas a generar:', this.value);
    this.valueChange.emit(this.value); // Emitir el número de cartas seleccionado
    this.closeModal();
  }
}
