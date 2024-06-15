import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://wiseglot-api.onrender.com';

  constructor() {}

  async request(endpoint: string, method: string = 'GET', body?: any, headers?: HeadersInit, parseJson: boolean = true): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return parseJson ? await response.json() : response;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  get(endpoint: string, headers?: HeadersInit, parseJson: boolean = true): Promise<any> {
    return this.request(endpoint, 'GET', null, headers, parseJson);
  }

  post(endpoint: string, body: any, headers?: HeadersInit, parseJson: boolean = true): Promise<any> {
    return this.request(endpoint, 'POST', body, headers, parseJson);
  }

  put(endpoint: string, body: any, headers?: HeadersInit, parseJson: boolean = true): Promise<any> {
    return this.request(endpoint, 'PUT', body, headers, parseJson);
  }

  delete(endpoint: string, headers?: HeadersInit, parseJson: boolean = true): Promise<any> {
    return this.request(endpoint, 'DELETE', null, headers, parseJson);
  }
}
