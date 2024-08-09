import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-option-box-one',
  templateUrl: './card-option-box-one.component.html',
  styleUrls: ['./card-option-box-one.component.scss'],
  standalone: true,
  imports: [CommonModule, BtnAuthComponent]
})
export class CardOptionBoxOneComponent  implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {}

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  handleClickAdd() {
    this.router.navigate(['/add-edit-card-view'], { queryParams: { mode: 'agregar' }});
    this.closeModal();
  }

  handleClickGenerate(){
    this.router.navigate(['/generate-cards-view']);
    this.closeModal();
  }
}
