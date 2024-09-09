import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.asObservable();

  private renderBaseSocketUrl = 'wss://wg-api-linux2.onrender.com/ws/chat/?token=';
  private awsBaseSocketUrl = 'ws://3.17.153.219:8000/ws/chat/?token=';

  constructor() {}

  public connect(token: string): void {
    if (!token) {
      console.error('Token is required to establish a WebSocket connection.');
      return;
    }

    const socketUrl = `${this.awsBaseSocketUrl}${token}`;
    this.socket$ = webSocket(socketUrl);

    this.socket$.subscribe({
      next: (message) => this.messagesSubject$.next(message),
      error: (err) => console.error('WebSocket Error:', err),
      complete: () => console.warn('WebSocket connection closed')
    });

  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  public closeConnection(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
