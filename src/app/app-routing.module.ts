import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';

const routes: Routes = [
  // { [path: '', component: SomeComponent} in order of specific to less
  { path: 'album', component: AlbumComponent },
  { path: 'new-releases', component: NewReleasesComponent },
  { path: 'artist', component: ArtistDiscographyComponent },
  { path: '', redirectTo: 'new-releases', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
