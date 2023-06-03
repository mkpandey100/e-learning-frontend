import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName: string | null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('fullName');
  }
  
  logout() {
    this.authService.logout();
  }
}
