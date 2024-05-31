import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = [
    { email: 'misa24jr@gmail.com', password: 'mjrb2003', nickname: 'Misa24jr', c1: 2, c2: 4, c3: 2, c4: 7},
    {
      email: 'pocomendez9@gmail.com',
      password: 'poco2003',
      nickname: 'PocoMendez9',
    },
  ];

  passwords = [
    { password: 'mjrb2003'}
  ]
  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    return !!user;
  }

  register(nickname: string, email: string, password: string): boolean {
    const existingUser = this.users.find(
      (u) => u.email === email || u.nickname === nickname
    );
    if (existingUser) {
      console.log('User already exists');
      return false;
    } else {
      this.users.push({ nickname, email, password });
      alert('User registered successfully');
      return true;
    }
  }
  askEmail(email: string): boolean {
    const user = this.users.find(
      (u) => u.email === email
    );
    return !!user;
  }

  validateCode(c1: string, c2: string, c3: string, c4: string): boolean {
    const user = this.users.find(
      (u) => u.c1 === parseInt(c1) && u.c2 === parseInt(c2) && u.c3 === parseInt(c3) && u.c4 === parseInt(c4)
    );
    return !!user;
  }

  changePassword(password: string): boolean {
    const existingUser = this.passwords.find(
      (u) => u.password === password
    );
    if (existingUser) {
      console.log('User already exists');
      return false;
    } else {
      this.passwords.push({ password });
      alert('User registered successfully');
      return true;
    }
  }
}
