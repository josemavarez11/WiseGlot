// card.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardCreatedSubject = new Subject<any>();
  private cardUpdatedSubject = new Subject<any>();
  private cardDeletedSubject = new Subject<any>();

  // Observable to which components can subscribe
  cardCreated$ = this.cardCreatedSubject.asObservable();
  cardUpdated$ = this.cardUpdatedSubject.asObservable();
  cardDeleted$ = this.cardDeletedSubject.asObservable();

  // Method to emit a new card creation event
  emitCardCreated(card: any): void {
    this.cardCreatedSubject.next(card);
  }

  emitCardUpdated(card: any): void {
    this.cardUpdatedSubject.next(card);
  }

  emitCardDeleted(card: any): void {
    this.cardDeletedSubject.next(card);
  }
}
