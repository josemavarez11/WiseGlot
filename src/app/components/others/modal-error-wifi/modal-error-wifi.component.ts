import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-error-wifi',
  templateUrl: './modal-error-wifi.component.html',
  styleUrls: ['./modal-error-wifi.component.scss'],
  standalone: true
})
export class ModalErrorWifiComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigate(){
    this.router.navigate(['/welcome']);
  }
}
