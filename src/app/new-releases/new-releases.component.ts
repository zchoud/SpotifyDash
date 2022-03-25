import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: Array<any> = [];
  dataSub: Subscription = new Subscription;

  constructor(private _router: Router, private musicService: MusicDataService) {
    this.releases = [];
   }

  ngOnInit(): void {
    this.dataSub = this.musicService.getNewReleases().subscribe(data => {
      this.releases = data.albums.items;
    });
  }

  goToAlbum(id:string): void{
    this._router.navigateByUrl(`/album/${id}`);
  }

  goToArtist(id:string): void{
    this._router.navigateByUrl(`/artist/${id}`);
  }

  ngOnDestroy(){
    //conditional chaining if dataSub exists then unsubscribe
    this.dataSub?.unsubscribe();
  }

}
