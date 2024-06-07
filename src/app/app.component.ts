import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarActive = true;
  isAuthenticated = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthentication();
      }
    });
  }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated = this.router.url !== '/login';
  } 

  headerSidebarToggle(isActive: boolean): void {
    console.log('Received:', isActive);
    this.isSidebarActive = isActive;
  }
  headerSidebarData(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
