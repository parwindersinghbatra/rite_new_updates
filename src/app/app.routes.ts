import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { APComponent } from './ap/ap.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login',component:LoginComponent, title:'Login Page'},
    {path:'dashboard', component:DashboardComponent, title: 'Dashboard', canActivate:[AuthGuard] },
    // {path:'about', component:AboutComponent, title:'About'},
    {path: 'autopilot', component:APComponent, title: 'AP', canActivate:[AuthGuard]},
    // {path: 'contact', component:ContactComponent, title: 'Contact'},
    {path: '**', component:PagenotfoundComponent, title: 'Pagenotfound', canActivate:[AuthGuard]},

];

export const routing = RouterModule.forRoot(routes);