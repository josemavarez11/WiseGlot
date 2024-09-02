import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
// Components
import { InputAnimateComponent } from 'src/app/components/buttons/input-animate/input-animate.component';
import { LoadingComponent } from 'src/app/components/others/loading/loading.component';
import { ApiService, ApiResponse } from 'src/services/api.service';
import { CapacitorPreferencesService } from 'src/services/capacitorPreferences.service';
import { WebSocketService } from 'src/services/webSocket.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    InputAnimateComponent,
    RouterLink,
    LoadingComponent
  ]
})
export class ChatViewPage implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  url_profile_pic: string = '';
  messages: { text: string, sent: boolean, loading?: boolean }[] = [];
  isLoading: boolean = false;
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private capacitorPreferencesService: CapacitorPreferencesService,
    private webSocketService: WebSocketService
  ) { }

  async ngOnInit() {
    try {
      this.isLoading = true;

      const getUrlProfilePicResponse = await this.capacitorPreferencesService.getUserURLProfilePic();
      this.url_profile_pic = getUrlProfilePicResponse ? getUrlProfilePicResponse : '';

      const token = await this.capacitorPreferencesService.getToken();

      if(token) {
        this.webSocketService.connect(token);
        this.subscription = this.webSocketService.messages$.subscribe((message) => {
          console.log('Message received:', message);
          this.messages.push({ text: message, sent: false });
          this.scrollToBottom();
        });

        const getMessagesResponse = await this.getMessagesByUser(token);

        if (getMessagesResponse.status !== 200 || 204) return console.error('Error getting messages');

        for(let message of getMessagesResponse.data){
          if (message.con_message) {
            this.messages.push({ text: message.con_message, sent: true });
            if (message.con_response) this.messages.push({ text: message.con_response, sent: false });
          }
        }

      } else return console.error('No token found');
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.webSocketService.closeConnection();
  }

  handleSend(message: string): void {
    if (message.trim()) {
      // Añadir el mensaje enviado por el usuario
      this.messages.push({ text: message, sent: true });
  
      // Añadir el mensaje de carga
      this.messages.push({ text: '', sent: false, loading: true });
  
      // Guardar el índice del mensaje de carga
      const loadingIndex = this.messages.length - 1;
  
      console.log('Message sent:', message);
  
      this.webSocketService.sendMessage(message);
  
      // Simular la recepción de la respuesta después de un tiempo
      setTimeout(() => {
        // Eliminar la animación de carga
        this.messages.splice(loadingIndex, 1);
        this.scrollToBottom();
      }, 500);
  
      this.scrollToBottom();
    }
  }
  

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  back(){
    this.router.navigate(['/home']);
  }

  private async getMessagesByUser(token: string) {
    const response: ApiResponse = await this.apiService.get(
      '/ia/get-messages-by-user/',
      [['Authorization', `Bearer ${token}`]]
    );

    return response;
  }
}
