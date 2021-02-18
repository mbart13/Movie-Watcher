import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Genre } from 'src/app/movies/models/genre';
import { Movie } from 'src/app/movies/models/movie';
import { MovieService } from 'src/app/movies/services/movie.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input()
  movies: Movie[];
  genres$: Observable<Genre[]>;
  currentUrl: string;
  @Output()
  toBeDeletedMovie = new EventEmitter<Movie>();
  justified: boolean;

  constructor(public movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.genres$ = this.movieService.getGenres$();
    this.currentUrl = this.route.snapshot.routeConfig.path;
  }

  remove(toBeDeletedMovie: Movie): void {
    this.toBeDeletedMovie.emit(toBeDeletedMovie);
  }

  getPage(page: number): void {
    this.movieService.urlParams.pageNumber = page;
    if (this.movieService.searchMode.getValue()) {
      this.movieService.searchMovies(this.movieService.searchTerm.getValue());
    } else {
      this.movieService.getMovies();
    }
  }
}
