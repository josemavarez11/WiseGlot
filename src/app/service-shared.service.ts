import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceSharedService {
  private email: string = '';

  constructor() { }

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
