import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
// Components
import { ButtonPreferencesOneComponent } from 'src/app/components/containers/button-preferences-one/button-preferences-one.component';
import { ButtonPreferencesTwoComponent } from 'src/app/components/containers/button-preferences-two/button-preferences-two.component';
import { TitlePreferenceComponent } from 'src/app/components/others/title-preference/title-preference.component';
@Component({
  selector: 'app-preferences-view1',
  templateUrl: './preferences-view1.page.html',
  styleUrls: ['./preferences-view1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ButtonPreferencesOneComponent, RouterLink, TitlePreferenceComponent, ButtonPreferencesTwoComponent]
})
export class PreferencesView1Page implements OnInit {
  step: number = 0;
  titles: string[] = [
    "What's your native languege?",
    "Por que quieres practicar el ingles?",
    "What's your english level?",
    "Selecciona tus temas de interes",
  ];

  descriptions: string[] = [
    "Describe your level of fluency in your native language",
    "We will use this information to match you with the right people",
    "Usually, how do you feel when you speak in english?",
    "All the topics you select will be used to match you with the right people",
  ];

  constructor() { }

  ngOnInit() {
  }
// Metodo para cambiar de paso
  selectOption(step: number){
    this.step = step;
  }

  getProgressBardWidth(){
    const stepsCount = this.titles.length;
    return `${(this.step / (stepsCount-1)) * 100}%`
  }

  previousStep(): void {
    if (this.step > 0) {
      this.step--;
    }
  }

}
