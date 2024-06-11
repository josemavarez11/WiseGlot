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

  // Codigo de validacion
  setCode(code: string) {
    this.c1 = this.c1;
    this.c2 = this.c2;
    this.c3 = this.c3;
    this.c4 = this.c4;
    this.c5 = this.c5;
    this.c6 = this.c6;
  }
  getCode(): string {
    return this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;
  }


  // Email
  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
