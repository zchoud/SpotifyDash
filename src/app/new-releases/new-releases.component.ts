import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: Array<any> = [];

  constructor(private _router: Router, private musicService: MusicDataService) {
    this.releases = [];
   }

  ngOnInit(): void {
    this.musicService.getNewReleases().subscribe(data => {
      this.releases = data.albums.items;
    });
  }

  goToAlbum(): void{
    this._router.navigateByUrl('/album');
  }

  goToArtist(): void{
    this._router.navigateByUrl('/artist');
    document.getElementById
  }

}
