import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { Router } from '@angular/router';
import { ApiResponse, ApiService } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { LoadingComponent } from '../loading/loading.component';
import { query } from '@angular/animations';

@Component({
  selector: 'app-card-option-day-selector',
  templateUrl: './card-option-day-selector.component.html',
  styleUrls: ['./card-option-day-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent, LoadingComponent, ModalErrorComponent]
})
export class CardOptionDaySelectorComponent implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<number>();
  @Output() cardsToGenerate = new EventEmitter<number>();
  @Input() propertyName: string = '';
  @Input() title: string = '';
  @Input() value: number = 10;
  @Input() valueType: string = 'cartas';
  @Input() subTitle: string = '';
  @Input() deckId: string = '';
  errorDescription: string = '';
  isLoading: boolean = false;
  isModalErrorVisible: boolean = false;

  isCustomInput: boolean = false; // Variable para controlar el modo personalizado
  private adjustInterval: any;
  private adjustSpeed: number = 200; // Velocidad inicial en milisegundos

  constructor(
    private router: Router,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  handleClickGenerate(){
    this.router.navigate(['/generate-cards-view'], { queryParams: { deckId: this.deckId } });
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

  async handleSaveClick() {
    try {
      this.isLoading = true;
      const token = await this.capacitorPreferencesService.getToken();
      if(token) {

        if (this.propertyName === 'generate') this.valueChange.emit(this.value)
        else {
          const updateDeckResponse: ApiResponse = await this.updateDeck(this.deckId, this.propertyName, this.value, token);

          if(updateDeckResponse.status !== 200) {
            this.errorDescription = 'Error al guardar el valor';
            this.isModalErrorVisible = true;
         }
        }
      } else {
        this.errorDescription = 'Error al obtener el token';
        this.isModalErrorVisible = true;
      }
    } catch (error) {
      this.errorDescription = 'Error al guardar el valor';
      this.isModalErrorVisible = true;
    } finally {
      this.isLoading = false;
      return this.closeModal();
    }
  }

  private async updateDeck(deckId: string, property: string, newValue: any, token: string) {
    const response: ApiResponse = await this.apiService.put(
      `/cards/update-deck/${deckId}/`,
      { [property]: newValue },
      [['Authorization', `Bearer ${token}`]]
    );

    return response;
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }

  validateNumericInput(event: any) {
    let inputValue = event.target.value;
  
    // Remueve cualquier carácter que no sea numérico
    inputValue = inputValue.replace(/\D/g, '');
  
    // Actualiza el valor con el número limpio
    event.target.value = inputValue;
    this.value = Number(inputValue);
  }
}

