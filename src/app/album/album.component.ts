import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import data from '../data/SearchResultsAlbum.json';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  paramSub: Subscription = new Subscription;  
  albumsSub: Subscription = new Subscription;  
  id: string= "";
  album: SpotifyApi.SingleAlbumResponse = {} as SpotifyApi.SingleAlbumResponse;

  constructor(private matSnack:MatSnackBar, private $route: ActivatedRoute, private musicService: MusicDataService) { 
   }

  ngOnInit(): void {
    this.paramSub = this.$route.params.subscribe(para => {
      this.id = para["id"].substring(1, para["id"].length);
    });
    this.albumsSub = this.musicService.getAlbumById(this.id).subscribe(data => {
      this.album = data;
    })
  }

  //return time in min:sec format given a ms time
  getTime(ms: any): any{
    let min = Math.trunc(ms / 60000);
    let sec = (ms % 60000) - min;
    return (min).toString() + ":" + sec.toString().substring(0,2);
  }

  ngOnDestroy(){
    this.paramSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }

}
