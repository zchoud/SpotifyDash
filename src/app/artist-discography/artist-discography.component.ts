import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import albumData from '../data/SearchResultsAlbums.json'
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  paramSub: Subscription = new Subscription;  
  artistSub: Subscription = new Subscription;  
  albumsSub: Subscription = new Subscription;  
  id: string= "";
  artist: SpotifyApi.SingleArtistResponse = {} as SpotifyApi.SingleArtistResponse;
  albums: SpotifyApi.ArtistsAlbumsResponse = {} as SpotifyApi.ArtistsAlbumsResponse;

  constructor(private _router: Router, private $route: ActivatedRoute, private musicService: MusicDataService) {
  }

  ngOnInit(): void {
    this.paramSub = this.$route.params.subscribe(para => {
      this.id = para["id"];
    });
    this.artistSub = this.musicService.getArtistById(this.id).subscribe(data => {
      this.artist = data;
    });
    this.albumsSub = this.musicService.getAlbumsByArtistId(this.id).subscribe(data => {
      this.albums = data;
    });
  }

  goToAlbum(id:any): void{
    this._router.navigateByUrl(`/album/${id}`);
  }

  ngOnDestroy(){
    this.paramSub.unsubscribe();
    this.albumsSub.unsubscribe();
    this.artistSub.unsubscribe();
  }
}
