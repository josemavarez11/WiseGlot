import { Component, OnInit, Input } from '@angular/core';

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

  private originalColor: string = '';

  constructor() { }

  ngOnInit() {
    this.originalColor = this.color;
  }

  handleChangeColor() {
    this.color = this.hoverColor;
    setTimeout(() => {
      this.color = this.originalColor;
    }, 500);
  }
}
