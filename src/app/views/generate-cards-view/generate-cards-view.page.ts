import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-cards-view',
  templateUrl: './generate-cards-view.page.html',
  styleUrls: ['./generate-cards-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GenerateCardsViewPage implements OnInit {
  isTextInputSelected = false;
  isSelectInputSelected = false;
  textValue: string = '';
  selectedValue: string = '';

  temas = [
    { value: 'Cultura y Entretenimiento', display: 'Cultura y Entretenimiento' },
    { value: 'Literatura', display: 'Literatura' },
    { value: 'Trabajo', display: 'Trabajo' },
    { value: 'Ciencias', display: 'Ciencias' },
    { value: 'Economía', display: 'Economía' },
    { value: 'Comida', display: 'Comida' },
    { value: 'Arte ', display: 'Arte ' },
  ];

  ngOnInit(): void {
      
  }

  constructor(private router: Router) { }
  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('selectInput') selectInput!: ElementRef;

  onCheckboxChange(type: string) {
    if (type === 'text') {
      this.isSelectInputSelected = false;
      setTimeout(() => this.textInput.nativeElement.focus(), 0);
    } else if (type === 'select') {
      this.isTextInputSelected = false;
      setTimeout(() => {
        this.selectInput.nativeElement.focus();
        this.selectInput.nativeElement.click(); // Simulate click to open the select
      }, 0);
    }
  }

  createCard() {
    if (this.isTextInputSelected && this.textValue) {
      console.log(this.textValue);
    } else if (this.isSelectInputSelected && this.selectedValue) {
      console.log(this.selectedValue);
    } else {
      console.log('No input selected');
    }
  }
  back(){
    this.router.navigate(['/inside-deck-']);
  }
}


