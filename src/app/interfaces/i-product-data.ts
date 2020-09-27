import { Observable } from 'rxjs';
import { IMovie } from './i-movie';
import { IMovieCategory } from './i-movie-category';

export interface IProductData {
  movies$: Observable<IMovie[]>;
  movieCategory$: Observable<IMovieCategory[]>;
  getMovieData(): void;
  findMovie(id: number): IMovie;
  renderCurrentMovies(): IMovie[];
  getSearchMovieData(searchWord: string): void;
  getCategoryMovieData(): void;
  changeCurrentCategory(categoryId: number): void;
}
