import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';

// Componentes
import { ButtonPreferencesOneComponent } from 'src/app/components/containers/button-preferences-one/button-preferences-one.component';
import { ButtonPreferencesTwoComponent } from 'src/app/components/containers/button-preferences-two/button-preferences-two.component';
import { ButtonPreferenceThreeComponent } from 'src/app/components/containers/button-preference-three/button-preference-three.component';
import { TitlePreferenceComponent } from 'src/app/components/others/title-preference/title-preference.component';

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
  ],
})
export class PreferencesView1Page implements OnInit {
  step: number = 0;
  selectedOption: boolean = false;
  selectedPreferences: any[] = []; // Para múltiples selecciones en el último paso

  titles: string[] = [
    "¿Cuál es tu lengua materna?",
    '¿Qué lenguajes deseas practicar?',
    '¿Por qué quieres practicar inglés?',
    '¿Cuál es tu nivel de inglés?',
    'Selecciona tus temas de interés',
  ];

  descriptions: string[] = [
    'Describe tu nivel de fluidez en tu lengua materna',
    'Selecciona los idiomas que quieres practicar',
    'Usaremos esta información para emparejarte con las personas adecuadas',
    '¿Normalmente, cómo te sientes cuando hablas en inglés?',
    'Todos los temas que selecciones se usarán para emparejarte con las personas adecuadas',
  ];

  preferenceOptions = [
    { img: "../../../assets/icon/img11.png", job: "Deportes" },
    { img: "../../../assets/icon/img6.png", job: "Cultura y Entretenimiento" },
    { img: "../../../assets/icon/img9.png", job: "Literatura" },
    { img: "../../../assets/icon/img1.png", job: "Trabajo" },
    { img: "../../../assets/icon/img10.png", job: "Ciencia" },
    { img: "../../../assets/icon/img7.png", job: "Economía" },
    { img: "../../../assets/icon/img5.png", job: "Comida" },
    { img: "../../../assets/icon/img8.png", job: "Arte" },
    { img: "../../../assets/icon/img4.png", job: "Tecnología" },
    { img: "../../../assets/icon/img3.png", job: "Política" },
  ];

  preferenceOne = [
    { language: "Español", subLanguage: "Nativo" },
    { language: "Inglés", subLanguage: "Intermedio" },
    { language: "Francés", subLanguage: "Básico" },
    { language: "Alemán", subLanguage: "Intermedio" },
    { language: "Italiano", subLanguage: "Nativo" },
    { language: "Portugués", subLanguage: "Intermedio" },
    { language: "Chino", subLanguage: "Básico" },
    { language: "Japonés", subLanguage: "Nativo" },
    { language: "Coreano", subLanguage: "Intermedio" },
    { language: "Ruso", subLanguage: "Básico" },
  ]

  preferenceTwo = [
    {img:"../../../assets/icon/Portugal.png", job:"Portugués"},
    {img:"../../../assets/icon/United States.png", job:"Inglés"},
    {img:"../../../assets/icon/Germany.png", job:"Alemán"},
    {img:"../../../assets/icon/Cuba.png", job:"Cubano"},
  ];

  preferenceThree = [
    {img:"../../../assets/icon/img1.png", job: "Opportunity to work"},
    {img:"../../../assets/icon/img2.png", job: "Travel"},
    {img:"../../../assets/icon/img3.png", job: "Study"},
    {img:"../../../assets/icon/img4.png", job: "Personal interest"},
    {img:"../../../assets/icon/img5.png", job: "Other"},
  ];

  preferenceFour = [
    {img:"../../../assets/icon/level1.png", job: "Beginner"},
    {img:"../../../assets/icon/level2.png", job: "Intermediate"},
    {img:"../../../assets/icon/level3.png", job: "Advanced"},
  ];

  

  constructor(private router: Router) {}

  ngOnInit() {}

  selectOption(step: number): void {
    if (this.step === 4) {
      // Asegurarse de que al menos una preferencia esté seleccionada
      if (this.selectedPreferences.length === 0) {
        alert('Por favor, selecciona al menos una opción antes de continuar.');
        return;
      }
    } else if (!this.selectedOption) {
      alert('Por favor, selecciona una opción antes de continuar.');
      return;
    }

    this.step = step;
    this.selectedOption = false; // Restablecer el estado de selección para el siguiente paso

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
      this.step = 4;
    }
  }
  // Métodos para manejar las selecciones
  selectOne(option: any): void {
    this.selectedOption = true;
  }

  selectTwo(option: any): void {
    this.selectedOption = true;
  }

  toggleSelectThree(option: any): void {
    const index = this.selectedPreferences.indexOf(option);
    if (index === -1) {
      this.selectedPreferences.push(option);
    } else {
      this.selectedPreferences.splice(index, 1);
    }
    this.selectedOption = this.selectedPreferences.length > 0;
  }

  isSelected(option: any): boolean {
    return this.selectedPreferences.includes(option);
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
