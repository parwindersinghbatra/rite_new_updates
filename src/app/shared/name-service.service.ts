import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameServiceService {

  private userData: { name: string, type: string } | undefined;
  
  constructor() { }

  setUserData(name: string, type:string){
    sessionStorage.setItem('userName', name)
    sessionStorage.setItem('userType', type)
  }
  
  getUserData(){
    return{
        name: sessionStorage.getItem('userName'),
        type: sessionStorage.getItem('userType'),
    }
  }
  clearUser() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');
  }
  }