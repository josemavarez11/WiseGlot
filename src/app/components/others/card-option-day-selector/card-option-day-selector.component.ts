import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-option-day-selector',
  templateUrl: './card-option-day-selector.component.html',
  styleUrls: ['./card-option-day-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BtnAuthComponent] // Asegúrate de importar FormsModule
})
export class CardOptionDaySelectorComponent implements OnInit {
  @Input() isVisible = false;
  @Input() deckId: string = '';
  @Output() close = new EventEmitter<void>();
  value = 40;
  min = 10;
  max = 80;

  constructor(private router: Router) { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  handleClickAdd() {
    this.router.navigate(['/add-edit-card-view', { mode: 'agregar', deckId: this.deckId }]);
    this.closeModal();
  }

  handleClickGenerate(){
    this.router.navigate(['/generate-cards-view']);
    this.closeModal();
  }
}
