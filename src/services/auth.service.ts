import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = [
    { email: 'misa24jr@gmail.com', password: 'mjrb2003', nickname: 'Misa24jr' },
    {
      email: 'pocomendez9@gmail.com',
      password: 'poco2003',
      nickname: 'PocoMendez9',
    },
  ];
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
      alert('User already exists');
      return false;
    } else {
      this.users.push({ nickname, email, password });
      alert('User registered successfully');
      return true;
    }
  }
}
