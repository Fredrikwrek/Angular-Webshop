import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { IMovieCategory } from 'src/app/interfaces/i-movie-category';
import { IProductData } from 'src/app/interfaces/i-product-data';

@Injectable({
  providedIn: 'root',
})
export class MockProductDataService implements IProductData {
  movies = new Subject<IMovie[]>();
  movieCategory = new Subject<IMovieCategory[]>();
  movies$ = this.movies.asObservable();
  movieCategory$ = this.movieCategory.asObservable();

  currentCategory: number = 0;
  currentMovies: IMovie[] = [];

  mockMovies: IMovie[] = [
    {
      description: 'bla',
      id: 55,
      imageUrl: 'url1',
      name: 'film1',
      price: 1999,
      productCategory: [],
      year: 2020,
    },
    {
      description: 'blabla',
      id: 110,
      imageUrl: 'url2',
      name: 'film2',
      price: 2999,
      productCategory: [],
      year: 2021,
    },
    {
      description: 'blablabla',
      id: 165,
      imageUrl: 'url2',
      name: 'film3',
      price: 3999,
      productCategory: [],
      year: 2019,
    },
  ];
  constructor() {}

  getMovieData(): void {
    let newMovies: IMovie[];
    if (this.currentCategory == 0) newMovies = this.mockMovies;
    else {
      newMovies = this.mockMovies.filter((item) => {
        return item.productCategory.find((id) => {
          return id.categoryId === this.currentCategory;
        });
      });
    }
    this.currentMovies = newMovies;
    this.movies.next(newMovies);
  }
  findMovie(id: number): IMovie {
    return this.currentMovies.find((movie) => {
      if (movie.id == id) return movie;
    });
  }
  renderCurrentMovies(): IMovie[] {
    /* this.currentMovies = this.mockMovies; */
    return this.currentMovies;
  }
  getSearchMovieData(searchWord: string): void {
    if (Array.isArray(this.mockMovies)) {
      this.currentMovies = this.mockMovies;
      this.movies.next(this.mockMovies);
    } else {
      this.currentMovies = [];
      this.movies.next([]);
    }
  }
  getCategoryMovieData() {
    const categoryData: IMovieCategory[] = [
      {
        id: 1,
        name: 'Sci-Fi',
      },
      {
        id: 2,
        name: 'Action',
      },
      {
        id: 3,
        name: 'Drama',
      },
    ];
    this.movieCategory.next(categoryData);
  }
  changeCurrentCategory(categoryId: number): void {
    this.currentCategory = categoryId;
  }
}
