import { Injectable } from '@angular/core';
import { ICartService } from '../interfaces/i-cart-service';
import { ICart, ICartProducts } from '../interfaces/i-cart';
import { IMovie } from '../interfaces/i-movie';

@Injectable({
  providedIn: 'root',
})
export class CartService implements ICartService {
  private cart: ICart = {
    totalPrice: 0,
    products: [],
  };

  receiveFromCart(): ICart {
    return this.cart;
  }
  sendToCart(movie: IMovie) {
    const newMovie: ICartProducts = {
      productName: movie.name,
      productId: movie.id,
      amount: 1,
      price: movie.price,
      totalPrice: movie.price,
    };
    this.cart.products.forEach((cartMovie) => {
      if (cartMovie.productId == movie.id) {
        ++cartMovie.amount;
        cartMovie.totalPrice += newMovie.price;
        this.cart.totalPrice += newMovie.totalPrice;
        newMovie.amount = 0;
      }
    });
    if (newMovie.amount) {
      this.cart.products.push(newMovie);
      this.cart.totalPrice += newMovie.totalPrice;
    }
  }
  removeOrAddFromCart(movieId: number, command: string) {
    this.cart.products.forEach((cartMovie) => {
      if (cartMovie.productId == movieId) {
        if (command === 'remove') {
          --cartMovie.amount;
          cartMovie.totalPrice -= cartMovie.price;
          this.cart.totalPrice -= cartMovie.price;
          if (!cartMovie.amount) {
            this.cart.products = this.cart.products.filter(
              (m) => m !== cartMovie
            );
          }
        }
        if (command === 'add') {
          ++cartMovie.amount;
          cartMovie.totalPrice += cartMovie.price;
          this.cart.totalPrice += cartMovie.price;
        }
      }
    });
  }
  clearCart() {
    this.cart = {
      totalPrice: 0,
      products: [],
    };
  }
}
