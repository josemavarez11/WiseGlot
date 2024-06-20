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
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { ApiService, ApiResponse } from 'src/services/api.service';
// Componentes
import { ButtonPreferencesOneComponent } from 'src/app/components/containers/button-preferences-one/button-preferences-one.component';
import { ButtonPreferencesTwoComponent } from 'src/app/components/containers/button-preferences-two/button-preferences-two.component';
import { ButtonPreferenceThreeComponent } from 'src/app/components/containers/button-preference-three/button-preference-three.component';
import { TitlePreferenceComponent } from 'src/app/components/others/title-preference/title-preference.component';
import { ModalErrorWifiComponent } from 'src/app/components/others/modal-error-wifi/modal-error-wifi.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';

@Component({
  selector: 'app-preferences-view',
  templateUrl: './preferences-view.page.html',
  styleUrls: ['./preferences-view.page.scss'],
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
    LoadingComponent,
  ],
})
export class PreferencesView1Page implements OnInit {
  step: number = 0;
  isLoading: boolean = false;
  selectedOption: boolean = false;
  selectedPreferencesAll: any[] = [];
  selectedTopics: any[] = [];

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
    'Elige tus temas de interés para que el contenido sea más interesante y motivador.',
  ];

  preferenceOneAndTwo: { id: string, abb_language: string, des_language: string, icon: string }[] = [];
  preferenceThree: { id: string, des_reason_to_study: string, icon: string }[] = [];
  preferenceFour: { id: string, des_language_level: string, icon: string }[] = [];
  preferenceFive: { id: string, des_topic: string, icon: string }[] = [];
  preferenceTopic: any[] = []; // Array to store selected topics

  constructor(private router: Router, private apiService: ApiService, private capacitorPreferencesService: CapacitorPreferencesService) {}

  async ngOnInit() {
    const options = await this.getPreferencesOptions();

    if(!options) return;

    this.processLanguagesOptions(options.languages);
    this.processReasonsToStudyOptions(options.reasons_to_study);
    this.processLanguageLevelsOptions(options.language_levels);
    this.processTopicsOptions(options.topics);
  }

  private async getPreferencesOptions(): Promise<any> {
    try {
      const response: ApiResponse = await this.apiService.get('/learning/get-preference-options/');

      if (response.error) {
        console.error('Error al obtener las opciones de preferencias:', response.error); //usar un modal de notificación
        return;
      }

      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error al obtener las opciones de preferencias:', error); //usar un modal de notificación
      return;
    }
  }

  private processLanguagesOptions(languages: any[]) {
    this.preferenceOneAndTwo = languages.map(item => ({
      id: item.id,
      abb_language: item.abb_language,
      des_language: item.des_language,
      icon: `../../../assets/icon/flags/${item.abb_language}.png`
    }));
  }

  private processReasonsToStudyOptions(reasons: any[]) {
    this.preferenceThree = reasons.map(item => ({
      id: item.id,
      des_reason_to_study: item.des_reason_to_study,
      icon: `../../../assets/icon/reasons-to-study/${item.des_reason_to_study}.png`
    }));
  }

  private processLanguageLevelsOptions(levels: any[]) {
    this.preferenceFour = levels.map(item => ({
      id: item.id,
      des_language_level: item.des_language_level,
      icon: `../../../assets/icon/language-levels/${item.des_language_level}.png`
    }));
  }

  private processTopicsOptions(topics: any[]) {
    this.preferenceFive = topics.map(item => ({
      id: item.id,
      des_topic: item.des_topic,
      icon: `../../../assets/icon/topics/${item.des_topic}.png`
    }));
  }

  async selectOption(step: number): Promise<void> {
    if (this.step === 4) {
      if (this.selectedPreferencesAll.length === 0) {
        alert('Por favor, selecciona al menos una opción antes de continuar.');
        return;
      }
    } else if (!this.selectedOption) {
      alert('Por favor, selecciona una opción antes de continuar.');
      return;
    }

    const token = await this.capacitorPreferencesService.getToken();
    var id_user_preference = '';

    if (step === 0) {
      this.step = 1;
    } else if (step === 1) {
      this.step = 2;
    } else if (step === 2) {
      this.step = 3;
    } else if (step === 3) {
      if (token) {
        id_user_preference = await this.savePreferences(this.selectedPreferencesAll, token);
      }
      this.step = 4;
    } else if (step === 4) {
      console.log('Selected Topics:', this.preferenceTopic);

      // if(token && id_user_preference !== '') {
      //   for (const topic of this.selectedTopics) {
      //     await this.saveTopicPreference(id_user_preference, '', token);
      //   }
      // }
      this.router.navigate(['/home']);
    }
  }

  private async saveTopicPreference(id_user_preference: string, id_topic: string, token: string): Promise<void> {
    this.isLoading = true;
    try {
      const response: ApiResponse = await this.apiService.post(
        '/learning/create-user-preference-topic/',
        { id_user_preference, id_topic },
        [['Authorization', `Bearer ${token}`]]
      );

      if (response.error) {
        console.error('Error al guardar los temas de preferencia. Intente de nuevo. ', response);
        //usar un modal de notificación
        this.router.navigate(['/register-welcome']);
        return;
      }
    } catch (error) {
      return console.error('Error al guardar los temas de preferencia:', error); //usar un modal de notificación
    } finally {
      this.isLoading = false;
    }
  }

  private async savePreferences(preferences: any[], token: string): Promise<any> {
    this.isLoading = true;
    try {
      const response: ApiResponse = await this.apiService.post(
        '/learning/create-user-preference/',
        {
          id_native_language: preferences[0].id,
          id_language_to_study: preferences[1].id,
          id_language_to_study_level: preferences[3].id,
          id_reason_to_study: preferences[2].id,
        },
        [['Authorization', `Bearer ${token}`]]
      );

      if (response.error) {
        console.error('Error al guardar las preferencias. Intente de nuevo. ', response);
        //usar un modal de notificación
        this.router.navigate(['/register-welcome']);
        return;
      }

      return response.data.id;
    } catch (error) {
      return console.error('Error al guardar las preferencias:', error); //usar un modal de notificación
    } finally {
      this.isLoading = false;
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

  onTopicSelected(topic: any): void {
    const index = this.preferenceTopic.findIndex(t => t.id === topic.id);
    if (index === -1) {
      this.preferenceTopic.push(topic);
    } else {
      this.preferenceTopic.splice(index, 1);
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
