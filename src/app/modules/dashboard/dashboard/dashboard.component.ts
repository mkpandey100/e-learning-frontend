import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/core/signalR/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private signalrService: SignalrService) { }

  ngOnInit(): void {
  }
}
