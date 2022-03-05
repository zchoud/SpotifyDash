import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import albumData from '../data/SearchResultsAlbums.json';
import artistData from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  artist: typeof artistData;
  albums: Array<typeof albumData.items[0]> = [];

  constructor(private _router: Router) {
    this.artist = artistData;
  }

  ngOnInit(): void {
    this.artist = artistData;
    this.albums = albumData.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
    console.log(this.albums);
  }

  goToAlbum(): void{
    this._router.navigateByUrl('/album');
  }

}
