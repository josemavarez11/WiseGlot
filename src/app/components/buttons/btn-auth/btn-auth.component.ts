import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-auth',
  templateUrl: './btn-auth.component.html',
  styleUrls: ['./btn-auth.component.scss'],
  standalone: true
})
export class BtnAuthComponent implements OnInit {
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
