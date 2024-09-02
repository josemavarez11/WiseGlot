import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalErrorComponent implements OnInit {
  @Input() isVisible = false;
  @Input() title = '';
  @Input() option = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeModal(){
    this.isVisible = false;
  }
}
