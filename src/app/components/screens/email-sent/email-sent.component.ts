import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
// Components
import { BtnAuthComponent } from '../../buttons/btn-auth/btn-auth.component';


@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss'],
  standalone: true,
  imports: [RouterLink, BtnAuthComponent]
})
export class EmailSentViewComponent  implements OnInit {
  @Output() stepChange = new EventEmitter<number>();
  constructor(private router: Router) { }

  ngOnInit() {}

    // Metodo para cambiar de paso
    selectOption(step: number){
      this.stepChange.emit(step);
    }

    handleClick(){
      this.router.navigate(['/validate-secret-code']);
    }

}
