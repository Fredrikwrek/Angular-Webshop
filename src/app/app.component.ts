import { Component, OnInit } from '@angular/core';
import { ProductDataService } from './services/product-data.service';
import { Router } from '@angular/router';
import { IMovieCategory } from './interfaces/i-movie-category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FredriksWebShop';
  hover = false;
  categories: IMovieCategory[] = [];

  constructor(
    private movieService: ProductDataService,
    private router: Router
  ) {}

  loadMovies() {
    this.movieService.getMovieData();
  }
  loadCategories() {
    this.movieService.getCategoryMovieData();
    this.movieService.movieCategory$.subscribe(
      (categoryData: IMovieCategory[]) => {
        this.categories = categoryData.filter((obj) => {
          return typeof obj.name === 'string' && typeof obj.id === 'number';
        });
      }
    );
  }
  changeCatergory(categoryId: number) {
    this.movieService.changeCurrentCategory(categoryId);
  }
  searchMovie(searchWord: string) {
    const currentPage = this.router.url;
    const displayPage = '/products';
    if (currentPage !== displayPage) this.router.navigate([displayPage]);
    if (searchWord.length > 0 && !searchWord.startsWith(' '))
      this.movieService.getSearchMovieData(searchWord);
    else this.loadMovies();
  }
  ngOnInit(): void {
    this.loadMovies();
    this.loadCategories();
  }
}
