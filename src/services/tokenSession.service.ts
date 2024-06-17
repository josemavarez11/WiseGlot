import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TokenSessionService {
  constructor() {}

  async setToken(token: string): Promise<void> {
    await Preferences.set({ key: 'token', value: token });
    return;
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }
}
