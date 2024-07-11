import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-profile-sub',
  templateUrl: './option-profile-sub.component.html',
  styleUrls: ['./option-profile-sub.component.scss'],
  standalone: true
})
export class OptionProfileSubComponent  implements OnInit {
  @Input() option: string = '';
  @Input() subTitle: string = '';
  constructor(private router: Router) { }

  ngOnInit() {}

  editDate(){
    this.router.navigate(['/edit-view', {option: this.option}]);
  }
}
