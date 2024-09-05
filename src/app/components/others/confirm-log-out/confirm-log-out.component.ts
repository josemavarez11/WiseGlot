import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-log-out',
  templateUrl: './confirm-log-out.component.html',
  styleUrls: ['./confirm-log-out.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ConfirmLogOutComponent  implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() click = new EventEmitter<void>();
  @Input() externalFunction: (() => void) | null = null;
  constructor(private router: Router) { }

  ngOnInit() {}


  handleClick(){
    if (this.externalFunction) {
      this.externalFunction(); // Ejecuta la función externa si está definida
    }
  }
}
