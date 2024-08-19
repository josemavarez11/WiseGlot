import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CapacitorPreferencesService {
  constructor() {}

  async setUserName(userName: string): Promise<void> {
    await Preferences.set({ key: 'userName', value: userName });
    return;
  }

  async getUserName(): Promise<string | null> {
    const response = await Preferences.get({ key: 'userName' });
    console.log(response);
    const { value } = response;
    return value;
  }

  async setUserURLProfilePic(url: string): Promise<void> {
    await Preferences.set({ key: 'userURLProfilePic', value: url });
    return;
  }

  async getUserURLProfilePic(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'userURLProfilePic' });
    return value;
  }

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

  async clearAll(): Promise<void> {
    await Preferences.clear();
    return;
  }
}
