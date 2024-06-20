import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Service
import { NavBarSelectionService } from 'src/services/nav-bar-selection.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class NavbarComponent  implements OnInit {
  selectedOption: string = 'home';
  constructor(private navbarSelectionService: NavBarSelectionService) { }

  ngOnInit() {
    this.navbarSelectionService.selectOption('home');
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.navbarSelectionService.selectOption(option);
  }
}