import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  constructor() {
    this.startConnection();
  }

  public startConnection(): void {
    const options = {
      // accessTokenFactory: () => this.loginToken,
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl(`${environment.BASE_SIGNAL}notifications`, options)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().then(() => {
      this.connectionIsEstablished = true;
      this.connectionEstablished.emit(true);
    }).catch((err) => {
      console.log('Error while establishing connection, retrying...');
    });
  }
}