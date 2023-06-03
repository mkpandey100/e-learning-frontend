import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;
  connectionEstablished = new EventEmitter<boolean>();
  accessToken: any;

  private connectionIsEstablished = false;

  recievedAddedMessage = new BehaviorSubject({});
  onAddedMessagesRecieved = this.recievedAddedMessage.asObservable();

  removedMessage = new BehaviorSubject({});
  onMessageRemoved = this.removedMessage.asObservable();

  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.startConnection();
  }

  public startConnection(): void {
    const options = {
      accessTokenFactory: () => this.accessToken,
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    };
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl(`${environment.BASE_SIGNAL}/notifications`, options)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().then(() => {
      this.connectionIsEstablished = true;
      this.connectionEstablished.emit(true);
      console.log('Connected successfully!!!');
    }).catch((err) => {
      console.log('Error while establishing connection, retrying...');
    });
  }

  public onMessageAddedSignal() {
    this.hubConnection.on('MessageAdded', (resp: any) => {
      this.recievedAddedMessage.next(resp);
    });
  }

  public onMessageRemovedSignal() {
    this.hubConnection.on('MessageRemoved', (resp: any) => {
      this.removedMessage.next(resp);
    });
  }
}