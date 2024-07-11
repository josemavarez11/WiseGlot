import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CapacitorPreferencesService {
  constructor() {}

  async setToken(token: string): Promise<void> {
    await Preferences.set({ key: 'token', value: token });
    return;
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }

  async deleteToken(): Promise<void> {
    await Preferences.remove({ key: 'token' });
    return;
  }
}
