import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from 'src/app/interfaces/i-movie';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  movie: IMovie = {
    description: '',
    id: 0,
    imageUrl: '',
    name: '',
    price: 0,
    productCategory: [],
    year: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: ProductDataService,
    private cartService: CartService
  ) {}

  addToCart(movie: IMovie) {
    this.cartService.sendToCart(movie);
  }

  ngOnInit(): void {
    if (this.movieService.renderCurrentMovies().length) {
      this.activatedRoute.params.subscribe((params) => {
        this.movie = this.movieService.findMovie(params.id);
      });
    } else {
      this.movieService.movies$.subscribe(() => {
        this.activatedRoute.params.subscribe((params) => {
          this.movie = this.movieService.findMovie(params.id);
        });
      });
    }
  }
}
