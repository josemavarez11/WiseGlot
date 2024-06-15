import { Injectable } from '@angular/core';

export interface ApiResponse<T = any> {
  data?: T;
  status: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://wiseglot-api.onrender.com';

  constructor() {}

  async request(endpoint: string, method: string = 'GET', body?: any, headers?: HeadersInit, parseJson: boolean = true): Promise<ApiResponse> {
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
      let data;

      if (parseJson) {
        data = await response.json();
      }

      let error;
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          error = data.error || `Client error: ${response.status}`;
        } else if (response.status >= 500) {
          error = `Server error: ${response.status}`;
        } else {
          error = `HTTP error! status: ${response.status}`;
        }
      }

      return { data, status: response.status, error };
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  get(endpoint: string, headers?: HeadersInit, parseJson: boolean = true): Promise<ApiResponse> {
    return this.request(endpoint, 'GET', null, headers, parseJson);
  }

  post(endpoint: string, body: any, headers?: HeadersInit, parseJson: boolean = true): Promise<ApiResponse> {
    return this.request(endpoint, 'POST', body, headers, parseJson);
  }

  put(endpoint: string, body: any, headers?: HeadersInit, parseJson: boolean = true): Promise<ApiResponse> {
    return this.request(endpoint, 'PUT', body, headers, parseJson);
  }

  delete(endpoint: string, headers?: HeadersInit, parseJson: boolean = true): Promise<ApiResponse> {
    return this.request(endpoint, 'DELETE', null, headers, parseJson);
  }
}
