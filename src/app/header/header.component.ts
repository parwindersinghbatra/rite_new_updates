import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
// import { Route, RouterLink, RouterOutlet } from '@angular/router';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnChanges{
@Input() sidebarActive = false;
@Input() isSidebarActive: boolean = true;

  @Output() toggleSidebar = new EventEmitter<boolean>();

  constructor(private router:Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSidebarActive']) {
      console.log('Header isSidebarActive changed:', changes['isSidebarActive'].currentValue);
    }
  }
  

  
  logout(){
    // sessionStorage.clear();
    // this.router.navigate(['/login']);

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    this.router.navigate(['/login']);

  }
}

