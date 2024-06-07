import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NameServiceService } from '../shared/name-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() sidebarToggle = new EventEmitter<boolean>();
  
  userName: string | null = '';
  userType: string | null = '';

isSidebarActive = true;
isSubMenuActive:boolean = false;

// sidebarItems = [
//   {name:'Dashboard', isActive:false, submenu:null},
//   {name:'Category', isActive:false, submenu:['HTML & CSS', 'React', 'JavaScript']},
//   {name:'Posts', isActive:false, submenu:['Web Design', 'Login Form']},
//   {name:'RITE App', isActive:false, submenu:null},
//   {name:'Reports', isActive:false, submenu:['PCR Reports', 'AP Logs']},
// ]

  activeItems:boolean[] = [false, false, false, false, false]

  constructor(private nameService: NameServiceService, private router:Router) {} // Inject shared service

  ngOnInit() {
    // Retrieving the user's data from the shared service
    const userData = this.nameService.getUserData();
    if (userData) {
      this.userName = userData.name;
      this.userType = userData.type;
    }
  }

  toggleSidebar() :void {
    this.isSidebarActive = !this.isSidebarActive;
    
    this.sidebarToggle.emit(this.isSidebarActive);
  }
  toggleActive(index:number){
      this.activeItems[index] = !this.activeItems[index];
      this.activeItems = this.activeItems.map((item, i) =>  i == index ? this.activeItems[index] : false)
  }
 
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}


