import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-preferences-one',
  templateUrl: './button-preferences-one.component.html',
  styleUrls: ['./button-preferences-one.component.scss'],
  standalone: true
})
export class ButtonPreferencesOneComponent implements OnInit {
  @Input() language: string = '';
  @Input() img: string = '';
  @Output() selected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  logValues() {
    this.selected.emit();
  }
}
