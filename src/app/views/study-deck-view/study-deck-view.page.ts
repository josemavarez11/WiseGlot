import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/components/others/modal-error/modal-error.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-study-deck-view',
  templateUrl: './study-deck-view.page.html',
  styleUrls: ['./study-deck-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoadingComponent, ModalErrorComponent]
})
export class StudyDeckViewPage implements OnInit {
  isModalErrorVisible: boolean = false;
  errorDescription: string = '';
  isLoading: boolean = false;
  learningSteps: Array<any> = [];

  constructor(
    private router: Router,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    try {
      this.isLoading = true;
      await this.getLearningSteps();
      console.log(this.learningSteps);
    } catch (error) {
      this.errorDescription = 'Failed to fetch learning steps';
      this.isModalErrorVisible = true;
    } finally {
      return this.isLoading = false;
    }
  }

  private async getLearningSteps() {
    const response = await this.capacitorPreferencesService.getAppLearningSteps();

    if (response === null) {
      const response = await this.apiService.get('/cards/get-learning-steps/');
      if (response.status === 200) this.learningSteps = response.data;
    } else this.learningSteps = response;
  }

  StudyNext(){
    this.router.navigate(['/deck-completed-animation']);
  }

  closeModalError(){
    this.isModalErrorVisible = false;
  }
}
