/********************************************************************************* 
 * * WEB422 – Assignment 05 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * * assignment has been copied manually or electronically from any other source (including web sites) or 
 * * distributed to other students. * 
 * * Name: Zian Choudhury Student ID: 131048209 Date: 03/25/2022 
 * * pass senecaapp
 * * ********************************************************************************/

import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web422-a4';
  menuState: boolean = false;
  searchString: string = "";
  token:any = null;

  constructor(private _route: Router, private auth: AuthService){
    this.menuState = false;
  }

  ngOnInit(): void {
    this.menuState = false;
    this._route.events.subscribe({
      next: (event) => {
        if(event instanceof NavigationStart){
          this.token = this.auth.readToken();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  isAuth():boolean{
    return this.auth.isAuthenticated();
  }

  logout(){
    console.log(this.token);
    localStorage.clear();
    this._route.navigate(['/login']);
  }

  menuToggle(): void{
    this.menuState = !this.menuState;    
  }

  handleSearch():void{
    if(this.searchString){
      this._route.navigate(['/search'], {queryParams: {q: this.searchString}});
      this.searchString = "";
    }
  }

}
