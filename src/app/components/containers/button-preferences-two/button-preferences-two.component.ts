import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';;

@Component({
  selector: 'app-button-preferences-two',
  templateUrl: './button-preferences-two.component.html',
  styleUrls: ['./button-preferences-two.component.scss'],
  standalone: true
})
export class ButtonPreferencesTwoComponent  implements OnInit {
  @Input() img: string = '';
  @Input() job: string = '';
  @Input() rute: string = '';
  constructor(private router: Router) { }

  ngOnInit() {}

  logValues() {
    console.log('img:', this.img);
    console.log('job:', this.job);
    // Redirecciona a otra vista
    // this.router.navigate([this.rute]);
  }
}
