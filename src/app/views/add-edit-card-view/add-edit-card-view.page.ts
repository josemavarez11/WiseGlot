import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-card-view',
  templateUrl: './add-edit-card-view.page.html',
  styleUrls: ['./add-edit-card-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddEditCardViewPage implements OnInit {
  mode: string = '' ;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'agregar'; // Default to 'agregar' if no mode is provided
    });
  }

  back(){
    this.router.navigate(['/inside-deck-view']);
  }

  createCard(){
    this.router.navigate(['/inside-deck-view']);
  }
}
