import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from '../data/NewReleasesAlbums.json';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: Array<typeof data.albums.items[0]>;

  constructor(private _router: Router) {
    this.releases = [];
   }

  ngOnInit(): void {
    this.releases = data.albums.items
  }

  goToAlbum(): void{
    this._router.navigateByUrl('/album');
  }

  goToArtist(): void{
    this._router.navigateByUrl('/artist');
  }

}
