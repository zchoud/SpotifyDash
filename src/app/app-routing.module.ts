import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { AboutComponent } from './about/about.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // { [path: '', component: SomeComponent} in order of specific to less
  { path: 'album', component: AlbumComponent },
  { path: 'new-releases', component: NewReleasesComponent },
  { path: 'artist', component: ArtistDiscographyComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/new-releases', pathMatch: 'full'},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
