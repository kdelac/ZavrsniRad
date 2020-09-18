import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Position } from '../Position';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public datax: any;
  public datay: any;
  public height: any;
  public width: any;

private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://tracinglocationa.azurewebsites.net/position')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('maca', (x, y, height, width) => {
      this.datax = x;
      this.datay = y;
      this.height = height;
      this.width = width;
    });
  }

  public send = (x, y) => {
    this.hubConnection.send('PositionFromServer', x, y)
  }
}


