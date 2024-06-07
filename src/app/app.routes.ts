import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { APComponent } from './ap/ap.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login',component:LoginComponent, title:'Login Page'},
    {path:'dashboard', component:DashboardComponent, title: 'Dashboard'},
    {path:'about', component:AboutComponent, title:'About'},
    {path: 'autopilot', component:APComponent, title: 'AP'},
    {path: 'contact', component:ContactComponent, title: 'Contact'},
    {path: '**', component:PagenotfoundComponent, title: 'Pagenotfound'},

];

export const routing = RouterModule.forRoot(routes);