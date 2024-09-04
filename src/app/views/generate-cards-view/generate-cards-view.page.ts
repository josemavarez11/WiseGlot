import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
// Components
import { CardOptionDaySelectorComponent } from 'src/app/components/others/card-option-day-selector/card-option-day-selector.component';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-generate-cards-view',
  templateUrl: './generate-cards-view.page.html',
  styleUrls: ['./generate-cards-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CardOptionDaySelectorComponent
  ],
})
export class GenerateCardsViewPage implements OnInit {
  isTextInputSelected = false;
  isSelectInputSelected = false;
  textValue: string = '';
  selectedValue: string = '';
  showNewCard: boolean = false;
  isModalVisible = false;
  topics: Array<any> = [];

  constructor(private router: Router, private capacitorPreferencesService: CapacitorPreferencesService) {}

  async ngOnInit() {
    this.updateShowNewCard();

    const topics = await this.capacitorPreferencesService.getAppTopics();
    this.topics = topics ? topics : [];
  }

  @ViewChild('textInput') textInput!: ElementRef;
  @ViewChild('selectInput') selectInput!: ElementRef;

  get isButtonEnabled(): boolean {
    return this.textValue.trim().length > 0 || this.selectedValue.length > 0;
  }

  onCheckboxChange(type: string) {
    if (type === 'text') {
      this.isSelectInputSelected = false;
      this.resetSelectInput();
      setTimeout(() => this.textInput.nativeElement.focus(), 0);
    } else if (type === 'select') {
      this.isTextInputSelected = false;
      setTimeout(() => {
        this.selectInput.nativeElement.focus();
        this.selectInput.nativeElement.click();
      }, 0);
    }
    this.updateShowNewCard();
  }

  onTextInputChange() {
    this.updateShowNewCard();
  }

  onSelectChange() {
    this.updateShowNewCard();
  }

  updateShowNewCard() {
    this.showNewCard = this.isButtonEnabled;
  }

  resetSelectInput() {
    this.selectInput.nativeElement.value = '';
    this.selectedValue = '';
    this.selectInput.nativeElement.options[0].selected = true;
    this.updateShowNewCard();
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

  back() {
    this.router.navigate(['/inside-deck-']);
  }

  closeModal() {
    this.isModalVisible = false;
  }

  openModal() {
    this.isModalVisible = true;
  }
}
