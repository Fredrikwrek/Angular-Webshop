import { Component, OnInit } from '@angular/core';
import { ICart } from 'src/app/interfaces/i-cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: ICart;
  readyForCheckOut = false;
  showErrorMessage = false;
  orderComplete = false;

  constructor(private cartService: CartService) {}
  checkOut() {
    this.cart.products.length > 0
      ? (this.readyForCheckOut = true)
      : (this.showErrorMessage = true);
  }
  remove(movieId: number) {
    this.cartService.removeOrAddFromCart(movieId, 'remove');
  }
  add(movieId: number) {
    this.cartService.removeOrAddFromCart(movieId, 'add');
  }
  ngOnInit(): void {
    this.cart = this.cartService.receiveFromCart();
  }
}
