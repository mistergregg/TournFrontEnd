import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as StompJS from 'sockjs-client';
import { ChatMessage } from '../model/chatmessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: any;
  disabled: boolean;

  constructor() {
  }

  connect() {
    let socket = new WebSocket("ws://localhost:8080/messagingService")
    this.ws = Stomp.over(socket);
    let that = this;

    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/topic/reply", function(message) {
        console.log(message);
        that.showGreeting(message.body);
      });
      that.disabled = true;
    }, function(error) {
      console.log("Error");
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendName() {
    let data = new ChatMessage();
    data.fromUsername = "user";
    this.ws.send("/app/message", {}, data);
  }

  showGreeting(message) {
  }

  setConnected(connected) {
    this.disabled = connected;
  }
}
