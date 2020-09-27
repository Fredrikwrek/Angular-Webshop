import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProductData } from '../interfaces/i-product-data';
import { IMovie } from '../interfaces/i-movie';
import { IMovieCategory } from '../interfaces/i-movie-category';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService implements IProductData {
  private movies = new Subject<IMovie[]>();
  private movieCategory = new Subject<IMovieCategory[]>();

  movies$ = this.movies.asObservable();
  movieCategory$ = this.movieCategory.asObservable();

  private currentCategory: number = 0;
  private currentMovies: IMovie[] = [];

  constructor(private http: HttpClient) {}
  getMovieData() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((movieData: IMovie[]) => {
        let newMovies: IMovie[];
        if (this.currentCategory == 0) newMovies = movieData;
        else {
          newMovies = movieData.filter((item) => {
            return item.productCategory.find((id) => {
              return id.categoryId === this.currentCategory;
            });
          });
        }
        this.currentMovies = newMovies;
        this.movies.next(newMovies);
      });
  }
  findMovie(id: number): IMovie {
    return this.currentMovies.find((movie) => {
      if (movie.id == id) return movie;
    });
  }
  renderCurrentMovies(): IMovie[] {
    return this.currentMovies;
  }

  getSearchMovieData(searchWord: string) {
    this.http
      .get(
        `https://medieinstitutet-wie-products.azurewebsites.net/api/search?=${searchWord}`
      )
      .subscribe((movieData: IMovie[] | {}) => {
        if (Array.isArray(movieData)) {
          this.currentMovies = movieData;
          this.movies.next(movieData);
        } else {
          this.currentMovies = [];
          this.movies.next([]);
        }
      });
  }
  getCategoryMovieData() {
    this.http
      .get(
        `https://medieinstitutet-wie-products.azurewebsites.net/api/categories`
      )
      .subscribe((categoryData: IMovieCategory[]) => {
        this.movieCategory.next(categoryData);
      });
  }
  changeCurrentCategory(categoryId: number) {
    this.currentCategory = categoryId;
  }
}
