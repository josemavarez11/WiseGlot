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
  @Input() redirectTo = ''; // Nueva propiedad para la ruta de redirección

  constructor(private router: Router) { }

  async ngOnInit() {
    if (this.isVisible) {
      setTimeout(() => {
        this.isVisible = false;
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        }
      }, 2000); // 2 segundos
    }
  }
}
