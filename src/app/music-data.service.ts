import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favoritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id:string): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id:string): Observable<SpotifyApi.ArtistsAlbumsResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id:string): Observable<SpotifyApi.SingleAlbumResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString:string): Observable<SpotifyApi.ArtistSearchResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  addToFavourites(id:number):boolean{
    var added = false;
    if(id && this.favoritesList.length < 50){
      this.favoritesList.push(id);
    }
    return added;
  }

  removeFromFavourites(id:number):Observable<any>{
    var ret = null;
    if(id && this.favoritesList.length > 0){
      ret = this.favoritesList.splice(this.favoritesList.indexOf(id), 1);
    }
    return this.getFavourites();
  }

  getFavourites():Observable<any>{
    if(this.favoritesList.length > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<Observable<any>>(`https://api.spotify.com/v1/tracks?ids=${this.favoritesList.join(',')}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }
    else{
      return new Observable(o=>{o.next([])});
    }
  }
}