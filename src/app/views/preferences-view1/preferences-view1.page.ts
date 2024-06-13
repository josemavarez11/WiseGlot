import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';

// Componentes
import { ButtonPreferencesOneComponent } from 'src/app/components/containers/button-preferences-one/button-preferences-one.component';
import { ButtonPreferencesTwoComponent } from 'src/app/components/containers/button-preferences-two/button-preferences-two.component';
import { ButtonPreferenceThreeComponent } from 'src/app/components/containers/button-preference-three/button-preference-three.component';
import { TitlePreferenceComponent } from 'src/app/components/others/title-preference/title-preference.component';
import { ModalErrorWifiComponent } from 'src/app/components/others/modal-error-wifi/modal-error-wifi.component';

@Component({
  selector: 'app-preferences-view1',
  templateUrl: './preferences-view1.page.html',
  styleUrls: ['./preferences-view1.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ButtonPreferencesOneComponent,
    RouterLink,
    TitlePreferenceComponent,
    ButtonPreferencesTwoComponent,
    ButtonPreferenceThreeComponent,
    ModalErrorWifiComponent,
  ],
})
export class PreferencesView1Page implements OnInit {
  step: number = 0;
  selectedOption: boolean = false;
  selectedPreferencesAll: any[] = [];

  titles: string[] = [
    '¿Cuál es tu idioma nativo?',
    '¿Qué idioma quieres aprender?',
    '¿Por qué quieres practicar inglés?',
    '¿Cuál es tu nivel de inglés?',
    'Selecciona tus temas de interés',
  ];

  descriptions: string[] = [
    '¡Cuéntanos cuál es tu idioma base para empezar esta aventura juntos!',
    'Elige el idioma que quieres aprender y prepárate para un aprendizaje único.',
    '¿Qué te motiva a aprender? Cuéntanos, ¡queremos que este viaje sea especial para ti!',
    'Dinos tu nivel actual, ¡sin importar si eres un novato o un pro!',
    'Elige tus temas de interés para que el contenido sea más interesante y motivador .',
  ];

  preferenceOptions = [
    { img: '../../../assets/icon/img11.png', job: 'Deportes' },
    { img: '../../../assets/icon/img6.png', job: 'Cultura y Entretenimiento' },
    { img: '../../../assets/icon/img9.png', job: 'Literatura' },
    { img: '../../../assets/icon/img1.png', job: 'Trabajo' },
    { img: '../../../assets/icon/img10.png', job: 'Ciencia' },
    { img: '../../../assets/icon/img7.png', job: 'Economía' },
    { img: '../../../assets/icon/img5.png', job: 'Comida' },
    { img: '../../../assets/icon/img8.png', job: 'Arte' },
    { img: '../../../assets/icon/img4.png', job: 'Tecnología' },
    { img: '../../../assets/icon/img3.png', job: 'Política' },
  ];

  preferenceOneAndTwo: { id: string, abb_language: string, des_language: string, icon: string }[] = [];

  preferenceThree = [
    { img: '../../../assets/icon/img1.png', job: 'Oportunidad de Trabajo' },
    { img: '../../../assets/icon/img2.png', job: 'Viaje' },
    { img: '../../../assets/icon/img3.png', job: 'Educación' },
    { img: '../../../assets/icon/img4.png', job: 'Interes Personal' },
    { img: '../../../assets/icon/img5.png', job: 'Otro' },
  ];

  preferenceFour = [
    { img: '../../../assets/icon/level1.png', job: 'Principiante' },
    { img: '../../../assets/icon/level2.png', job: 'Intermedio' },
    { img: '../../../assets/icon/level3.png', job: 'Avanzado' },
  ];

  constructor(private router: Router) {}

  async ngOnInit() {
    const response = await fetch('https://wiseglot-api.onrender.com/learning/get-languages/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    for (let item of data) {
      this.preferenceOneAndTwo.push({
        id: item.id,
        abb_language: item.abb_language,
        des_language: item.des_language,
        icon: `../../../assets/icon/flags/${item.abb_language}.png`
      });
    }
  }

  selectOption(step: number): void {
    if (this.step === 4) {
      if (this.selectedPreferencesAll.length === 0) {
        alert('Por favor, selecciona al menos una opción antes de continuar.');
        return;
      }
    } else if (!this.selectedOption) {
      alert('Por favor, selecciona una opción antes de continuar.');
      return;
    }

    this.step = step;
    this.selectedOption = false;

    if (step === 0) {
      this.step = 1;
    }
    if (step === 1) {
      this.step = 2;
    }
    if (step === 2) {
      this.step = 3;
    }
    if (step === 3) {
      console.log('All selected preferences:');
      console.log(this.selectedPreferencesAll);
      this.step = 4;
    }
    if (step === 4) {
      this.router.navigate(['/home']);
    }
  }

  selectOne(option: any): void {
    option.selected = true;
    this.selectedOption = true;
    this.selectedPreferencesAll.push(option);
  }

  selectTwo(option: any): void {
    option.selected = true;
    this.selectedOption = true;
    this.selectedPreferencesAll.push(option);
  }

  toggleSelectThree(option: any): void {
    option.selected = !option.selected;
    this.selectedOption = this.selectedPreferencesAll.length > 0;
    if (option.selected) {
      this.selectedPreferencesAll.push(option);
    } else {
      const index = this.selectedPreferencesAll.findIndex(
        (item) => item === option
      );
      if (index !== -1) {
        this.selectedPreferencesAll.splice(index, 1);
      }
    }
  }

  isSelected(option: any): boolean {
    return this.selectedPreferencesAll.includes(option);
  }

  getProgressBardWidth() {
    const stepsCount = this.titles.length;
    return `${(this.step / (stepsCount - 1)) * 100}%`;
  }

  previousStep(): void {
    if (this.step > 0) {
      this.step--;
    } else {
      this.router.navigate(['/register-welcome']);
    }
  }
}
