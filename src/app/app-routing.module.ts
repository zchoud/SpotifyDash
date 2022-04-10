import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { AboutComponent } from './about/about.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavoiritesComponent } from './favoirites/favoirites.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  // { [path: '', component: SomeComponent} in order of specific to less
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'album/:id', component: AlbumComponent, canActivate: [GuardAuthService] },
  { path: 'new-releases', component: NewReleasesComponent, canActivate: [GuardAuthService] },
  { path: 'artist/:id', component: ArtistDiscographyComponent, canActivate: [GuardAuthService] },
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  { path: 'favorites', component: FavoiritesComponent, canActivate: [GuardAuthService] },
  { path: 'search', component: SearchResultComponent, canActivate: [GuardAuthService] },
  { path: '', redirectTo: '/new-releases', pathMatch: 'full'},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule]
})
export class AppRoutingModule { }
