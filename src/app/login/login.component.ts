import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NameServiceService } from '../shared/name-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // isLoggedIn: boolean = false;
  LoginForm: any;

  users = [
    { name : 'Sumit', email: 'sarora@teksearch.in', password: '123456', type:'Semi Admin'},
    { name : 'M Singh', email: 'msingh@proviso.ca', password: '123456',  type:'Global Admin' },
    { name : 'Parwinder', email: 'psingh@teksearch.in', password: '123456',  type:'Billing Admin' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    
    private nameService: NameServiceService

  ) {}
userName: string ='';
userType:string ='';

  ngOnInit() {
if(this.isLoggedIn()){
  this.router.navigate(['/dashboard']);
}

    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      if (email && password) {
        this.LoginForm.patchValue({ email, password });
      }
    }
  }

  isLoggedIn() {
    return localStorage.getItem('email') && localStorage.getItem('password');
  }


  login() {
    if (this.LoginForm.valid) {
      const email = this.LoginForm.get('email').value;
      const password = this.LoginForm.get('password').value;
      const rememberMe = this.LoginForm.get('rememberMe').value;
  
      const isUserValid = this.users.some(user => user.email === email && user.password === password);
  
      if (isUserValid) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.setItem('rememberMe', 'false');
        }
        this.router.navigate(['/dashboard']);
        const user = this.users.find(user => user.email === email && user.password === password);
        this.nameService.setUserData(user!.name, user!.type);
      } else {
        this.snackbar.open('Please enter correct ID and Password', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.snackbar.open('Invalid email or password', 'Close', {
        duration: 3000,
      });
    }
  }
}


  
//   login() {
//     if (this.LoginForm.valid) {

//       const email = this.LoginForm.get('email').value;
//       const password = this.LoginForm.get('password').value;
//       const rememberMe = this.LoginForm.get('rememberMe').value

// const isUserValid = this.users.find(user => user.email === email && user.password === password);

  

//            if (isUserValid) {
//             localStorage.setItem('email', email);
//             localStorage.setItem('password', password);
//         this.nameService.setUserData(isUserValid.name, isUserValid.type);
//         this.router.navigate(['/dashboard']);

//           if(rememberMe){
//             localStorage.setItem('email', email);
//             localStorage.setItem('password', password);
//             localStorage.setItem('rememberMe', 'true');
//           }
//           else{
//             localStorage.removeItem('email');
//             localStorage.removeItem('password');
//             localStorage.setItem('rememberMe','false');
//           }
//       } 
//       else {
//         this.snackbar.open('Please enter correct ID and Password', 'Close', {
//           duration: 3000,
//         });
//       }
//     } else {
//       this.snackbar.open('Invalid email or password', 'Close', {
//         duration: 3000,
//       });
//     }
//   }
// }
