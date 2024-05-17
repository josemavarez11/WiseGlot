import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-preferences-one',
  templateUrl: './button-preferences-one.component.html',
  styleUrls: ['./button-preferences-one.component.scss'],
  standalone: true
})
export class ButtonPreferencesOneComponent implements OnInit {
  @Input() language: string = '';
  @Input() subLanguage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  logValues() {
    console.log('Language:', this.language);
    console.log('SubLanguage:', this.subLanguage);
    // Redirecciona a otra vista
    // this.router.navigate(['/preferences-view2']);
  }
}
