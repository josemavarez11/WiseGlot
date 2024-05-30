import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-preference-three',
  templateUrl: './button-preference-three.component.html',
  styleUrls: ['./button-preference-three.component.scss'],
  standalone: true
})
export class ButtonPreferenceThreeComponent  implements OnInit {
  @Input() img: string = '';
  @Input() job: string = '';
  @Input() rute: string = '';
  @Output() selected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}
  
  logValues() {
    this.selected.emit();
    console.log('img:', this.img);
    console.log('job:', this.job);
  }
}
