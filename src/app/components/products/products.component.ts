import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMovie } from 'src/app/interfaces/i-movie';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  movies: IMovie[] = [];
  moviesubscription: Subscription;
  constructor(
    private movieService: ProductDataService,
    private cartService: CartService
  ) {}

  addToCart(movie: IMovie) {
    this.cartService.sendToCart(movie);
  }

  ngOnInit(): void {
    this.movies = this.movieService.renderCurrentMovies();
    this.moviesubscription = this.movieService.movies$.subscribe(
      (moviesFromService) => {
        this.movies = moviesFromService;
        this.movieService.changeCurrentCategory(0);
      }
    );
  }
  ngOnDestroy(): void {
    this.moviesubscription.unsubscribe();
  }
}
