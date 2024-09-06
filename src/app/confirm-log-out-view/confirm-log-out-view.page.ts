import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';

@Component({
  selector: 'app-confirm-log-out-view',
  templateUrl: './confirm-log-out-view.page.html',
  styleUrls: ['./confirm-log-out-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfirmLogOutViewPage implements OnInit {

  constructor(private router: Router, private capacitorPreferencesService: CapacitorPreferencesService) { }

  ngOnInit() {
  }

  cancel(){
    this.router.navigate(['/home']);
  }

  async handleLogOut(){
    await this.capacitorPreferencesService.clearAll();
    this.router.navigate(['/login'])
  }

}
