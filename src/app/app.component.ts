/********************************************************************************* 
 * * WEB422 – Assignment 05 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * * assignment has been copied manually or electronically from any other source (including web sites) or 
 * * distributed to other students. * 
 * * Name: Zian Choudhury Student ID: 131048209 Date: 03/25/2022 
 * * pass senecaapp
 * * ********************************************************************************/

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web422-a4';
  menuState: boolean = false;
  searchString: string = "";

  constructor(private _route: Router){
    this.menuState = false;
  }

  ngOnInit(): void {
    this.menuState = false;
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
