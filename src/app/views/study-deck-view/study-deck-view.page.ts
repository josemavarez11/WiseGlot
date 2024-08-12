import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-deck-view',
  templateUrl: './study-deck-view.page.html',
  styleUrls: ['./study-deck-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StudyDeckViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  StudyNext(){
    this.router.navigate(['/deck-completed-animation']);
  }

}
