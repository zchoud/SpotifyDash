  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { SpotifyTokenService } from './spotify-token.service';
  import { environment } from 'src/environments/environment';
  import { mergeMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

  @Injectable({
  providedIn: 'root'
  })
  export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id:string): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
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

  addToFavourites(id:string): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    const token = localStorage.getItem("access_token");
    return this.http.put<any>(`${environment.userAPIBase}/api/user/favourites/${id}`, {headers: { "Authorization": `Bearer ${token}` },
    });
  }

  removeFromFavourites(id:string): Observable<any> {
    const token = localStorage.getItem("access_token");
    return this.http.delete<[String]>(`${environment.userAPIBase}/api/user/favourites/${id}`, {headers: { "Authorization": `Bearer ${token}` }}).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if(favouritesArray.length > 0){
        favouritesArray.splice(favouritesArray.indexOf(id), 1);
      }
      return this.getFavourites();
    }));
  }

  getFavourites():Observable<any>{
    const token = localStorage.getItem("access_token");
    return this.http.get<[String]>(`${environment.userAPIBase}/api/user/favourites`, {headers: { "Authorization": `Bearer ${token}` },})
      .pipe(mergeMap((favouritesArray) => {
          // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
          // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
          if (favouritesArray.length < 1) {
            return new Observable((o) => {
              o.next({tracks: []});
            });
          }
          else{
            return this.spotifyToken.getBearerToken()
              .pipe(mergeMap((token) => {
                return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join(',')}`, { headers: { Authorization: `Bearer ${token}` } });
              })
            );
          }
        })
      );
  }
  }