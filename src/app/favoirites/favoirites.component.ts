import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from './../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoirites',
  templateUrl: './favoirites.component.html',
  styleUrls: ['./favoirites.component.css']
})
export class FavoiritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favSub: Subscription = new Subscription;
  icon: boolean = false;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.favSub = this.musicService.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavoirites(id:any){
    this.musicService.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    });
  }

  //return time in min:sec format given a ms time
  getTime(ms: any): any{
    let min = Math.trunc(ms / 60000);
    let sec = (ms % 60000) - min;
    return (min).toString() + ":" + sec.toString().substring(0,2);
  }

  changeIcon(id:string):void{
    var star = "close";
    var music = "queue_music";
    const icon = document.getElementById(`icon-${id}`);
    if(icon){
      this.icon ? icon.innerHTML = music : icon.innerHTML = star;
    } 
    this.icon = !this.icon;
    //star_rate
  }

  ngOnDestroy():void{
    this.favSub.unsubscribe();
  }

}
