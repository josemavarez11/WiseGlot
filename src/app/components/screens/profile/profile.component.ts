import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Components
import { OptionsProfileComponent } from '../../others/options-profile/options-profile.component';
import { OptionProfileSubComponent } from '../../others/option-profile-sub/option-profile-sub.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [OptionsProfileComponent, OptionProfileSubComponent]
})
export class ProfileComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  deleteUser(){
    this.router.navigate(['/delete-account']);
  }
}
