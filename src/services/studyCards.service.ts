import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudyCardsService {
  public cardsNotStudied: any[] = [];
  public cardsToReview: any[] = [];
  public cardsAlreadyStudied: any[] = [];
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudyCardsService {
//   // Initializing BehaviorSubjects with empty arrays
//   private cardsNotStudied = new BehaviorSubject<any[]>([]);
//   private cardsToReview = new BehaviorSubject<any[]>([]);

//   // Exposing the Observables for the components to subscribe to
//   cardsNotStudied$ = this.cardsNotStudied.asObservable();
//   cardsToReview$ = this.cardsToReview.asObservable();

//   // Method to update the first array
//   setCardsNotStudied(data: any[]) {
//     this.cardsNotStudied.next(data);
//   }

//   // Method to update the second array
//   setCardsToReview(data: any[]) {
//     this.cardsToReview.next(data);
//   }
// }

