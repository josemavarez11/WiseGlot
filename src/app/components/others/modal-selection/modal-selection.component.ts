import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-selection',
  templateUrl: './modal-selection.component.html',
  styleUrls: ['./modal-selection.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton]
})
export class ModalSelectionComponent implements OnInit {

  @Output() selection = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  handleSelection(choice: string) {
    this.selection.emit(choice);
  }
}
