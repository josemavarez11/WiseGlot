import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-option-card',
  templateUrl: './btn-option-card.component.html',
  styleUrls: ['./btn-option-card.component.scss'],
  standalone: true,
})
export class BtnOptionCardComponent  implements OnInit {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() textColor: string = '';
  @Input() borderColor: string = '';
  @Input() hoverColor: string = '';
  @Input() width: string = '200px';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<void>();
  private originalColor: string = '';
  constructor() { }

  ngOnInit() {
    this.originalColor = this.color;
  }

  handleChangeColor() {
    if (!this.disabled) {
      this.color = this.hoverColor;
      setTimeout(() => {
        this.color = this.originalColor;
      }, 100);
      this.click.emit();
    }
  }
}