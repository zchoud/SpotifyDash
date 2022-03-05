import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web422-a4';
  menuState: boolean = false;

  constructor(){
    this.menuState = false;
  }

  ngOnInit(): void {
    this.menuState = false;
  }

  menuToggle(): void{
    this.menuState = !this.menuState;    
  }

}
