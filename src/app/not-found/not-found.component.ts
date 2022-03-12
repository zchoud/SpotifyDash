import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  "assets": [
    '../../assets/number-4-svgrepo-com.svg',
    '../../assets/Aj_Simple_Turntable_clip_art.svg'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
