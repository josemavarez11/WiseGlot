import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Components
import { MessageErrorComponent } from '../../containers/message-error/message-error.component';
// Services
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-ask-email-view',
  templateUrl: './ask-email-view.component.html',
  styleUrls: ['./ask-email-view.component.scss'],
  standalone: true,
  imports: [RouterLink, MessageErrorComponent, CommonModule, FormsModule]
})
export class AskEmailViewComponent implements OnInit {
  @Output() stepChange = new EventEmitter<number>();
  email: string = '';
  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/ask-email') {
          this.resetForm();
        }
      }
    });
  }


  ngOnInit() {
    this.resetForm();
  }

  resetForm(): void{
    this.email = '';
  }

  // Metodo para cambiar de paso
  selectOption(step: number){
    this.stepChange.emit(step);
  }

  handleClick(): void{
    console.log('Email:', this.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.errorMessage = 'Please fill in all fields';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
    }
    else if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
    }
    else
    if(this.authService.askEmail(this.email)){
      this.selectOption(1);
    } 
    else{
      this.errorMessage = 'Invalid email';
      this.showErrorMessage = true;
      this.toggleErrorMessage();
    }
    // else{
    //   this.errorMessage = 'User does not exist';
    //   this.showErrorMessage = true;
    //   this.toggleErrorMessage();
    // }
  }

  toggleErrorMessage() {
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000); // Oculta el mensaje después de 3 segundos
  }
}
