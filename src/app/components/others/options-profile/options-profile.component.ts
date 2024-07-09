import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-profile',
  templateUrl: './options-profile.component.html',
  styleUrls: ['./options-profile.component.scss'],
  standalone: true
})
export class OptionsProfileComponent  implements OnInit {
  @Input() title: string = '';
  @Input() option: string = '';
  constructor(private router: Router) { }

  ngOnInit() {}

  editDate(){
    this.router.navigate(['/edit-view', {option: this.option, title: this.title}]);
  }
}
