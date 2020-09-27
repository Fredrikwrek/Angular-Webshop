import { ICart } from './i-cart';
import { IMovie } from './i-movie';

export interface ICartService {
  receiveFromCart(): ICart;
  sendToCart(movie: IMovie): void;
  removeOrAddFromCart(movieId: number, command: string): void;
  clearCart(): void;
}
