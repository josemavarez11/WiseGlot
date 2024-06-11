import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceSharedService {
  private email: string = '';
  private c1: string = '';
  private c2: string = '';
  private c3: string = '';
  private c4: string = '';
  private c5: string = '';
  private c6: string = '';


  constructor() { }

  // Email
  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  setSecretCode(c1: string, c2: string, c3: string, c4: string, c5: string, c6: string) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.c4 = c4;
    this.c5 = c5;
    this.c6 = c6;
  }

  getSecretCode(): [string, string, string, string, string, string] {
    return [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6];
  }

}
