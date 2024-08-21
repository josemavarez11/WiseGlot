import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
// Components
import { InputAnimateComponent } from 'src/app/components/buttons/input-animate/input-animate.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, InputAnimateComponent, RouterLink]
})
export class ChatViewPage implements OnInit {

  constructor(private router: Router) { }
  messages: { text: string, sent: boolean, loading?: boolean }[] = [];
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  ngOnInit(): void {
    setInterval(() => {
      this.receiveMessage();
    }, 6000);
  }

  handleSend(message: string): void {
    if (message.trim()) {
      // Encuentra la posición del mensaje en carga, si existe
      const loadingIndex = this.messages.findIndex(message => message.loading);

      if (loadingIndex !== -1) {
        // Inserta el mensaje enviado antes del mensaje en carga
        this.messages.splice(loadingIndex, 0, { text: message, sent: true });
      } else {
        // Agrega el mensaje al final si no hay mensaje en carga
        this.messages.push({ text: message, sent: true });
      }
      this.scrollToBottom();
    }
  }

  receiveMessage(): void {
    // Simula la llegada del mensaje con un indicador de carga
    this.messages.push({ text: '', sent: false, loading: true });
    this.scrollToBottom();

    setTimeout(() => {
      const receivedMessages = [
        '¿Cómo has estado? ¿De qué te gustaría hablar el día de hoy?',
        '¡Hola! ¿Qué piensas tú sobre los avances tecnológicos en la actualidad?',
        '¿Qué opinas sobre la educación en línea?',
        '¿Cuál es tu opinión sobre la inteligencia artificial?',
        '¿Qué piensas sobre la automatización de procesos?',
        '¿Qué opinas sobre la programación?',
      ];
      const randomMessage = receivedMessages[Math.floor(Math.random() * receivedMessages.length)];
      const loadingMessageIndex = this.messages.findIndex(message => message.loading);

      if (loadingMessageIndex !== -1) {
        this.messages[loadingMessageIndex] = { text: randomMessage, sent: false, loading: false };
        this.scrollToBottom();
      }
    }, 5000);
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  back(){
    this.router.navigate(['/home']);
  }
}