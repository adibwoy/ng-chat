import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: string[] = ["Hey", "What's Up"];

  constructor() {
  }

  ngOnInit() {
  }

}
