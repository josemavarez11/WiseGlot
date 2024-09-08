import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { ApiService, ApiResponse } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapacitorPreferencesService {
  private userDataSubject = new BehaviorSubject<any>(null);
  data$ = this.userDataSubject.asObservable();

  constructor(private apiService: ApiService) {}

  async saveAppTopics(): Promise<void> {
    try {
      const response = await this.apiService.get('/learning/get-topics/')
      await Preferences.set({ key: 'appTopics', value: JSON.stringify(response.data) });
    } catch (error) {
      console.error('Failed to fetch and store app topics:', error);
    }
  }

  async saveAppLearningSteps(): Promise<void> {
    try {
      const response = await this.apiService.get('/cards/get-learning-steps/')
      await Preferences.set({ key: 'appLearningSteps', value: JSON.stringify(response.data) });
    } catch (error) {
      console.error('Failed to fetch and store app learning steps:', error);
    }
  }

  async getAppLearningSteps(): Promise<Array<any> | null> {
    const response = await Preferences.get({ key: 'appLearningSteps' })
    const { value } = response;

    if(value === null) return null;

    return JSON.parse(value);
  }

  async getAppTopics(): Promise<Array<any> | null> {
    const response = await Preferences.get({ key: 'appTopics' })
    const { value } = response;

    if(value === null) return null;

    return JSON.parse(value);
  }

  async getUserData(): Promise<any> {
    const response = await Preferences.get({ key: 'userData' });
    const { value } = response;

    if(value === null) return null;

    return JSON.parse(value);
  }

  async setUserData(userData: any): Promise<void> {
    await Preferences.set({ key: 'userData', value: JSON.stringify(userData) });
    this.userDataSubject.next(JSON.stringify(userData));
    return;
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
