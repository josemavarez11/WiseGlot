import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-data-view',
  templateUrl: './edit-user-data-view.page.html',
  styleUrls: ['./edit-user-data-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditUserDataViewPage implements OnInit {
  option: string = '';
  title: string = '';
  constructor(private route: ActivatedRoute, private routerBack: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.option = params['option'];
      this.title = params['title'];
    });
  }

  back(){
    this.routerBack.navigate(['/home']);
  }
}
