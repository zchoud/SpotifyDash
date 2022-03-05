import { Component, OnInit } from '@angular/core';
import data from '../data/SearchResultsAlbum.json';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: typeof data; 

  constructor() { 
    this.album = data;
   }

  ngOnInit(): void {
    this.album = data;
  }

  //return time in min:sec format given a ms time
  getTime(ms: any): any{
    let min = Math.trunc(ms / 60000);
    let sec = (ms % 60000) - min;
    return (min).toString() + ":" + sec.toString().substring(0,2);
  }

}
