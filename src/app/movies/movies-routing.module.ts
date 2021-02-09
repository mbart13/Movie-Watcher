import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieBrowserComponent} from './movie-browser/movie-browser.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {AuthGuard} from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieBrowserComponent
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {

}
