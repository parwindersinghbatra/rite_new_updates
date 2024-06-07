import { Component } from '@angular/core';
import { NameServiceService } from '../shared/name-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userName: string | null = '';
  userType: string | null = '';

  constructor(private nameService: NameServiceService, private router:Router) {} // Inject shared service

  ngOnInit() {
    // Retrieving the user's data from the shared service
    const userData = this.nameService.getUserData();
    if (userData) {
      this.userName = userData.name;
      this.userType = userData.type;
    }
  }


}
