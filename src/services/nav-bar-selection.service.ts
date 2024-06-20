import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarSelectionService {
  private selectedOptionSubject = new Subject<string>();

  constructor() {}
  
  selectedOption$ = this.selectedOptionSubject.asObservable();
  selectOption(option: string) {
    this.selectedOptionSubject.next(option);
  }
}
