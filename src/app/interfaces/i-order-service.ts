import { Observable } from 'rxjs';
import { IOrder } from './i-order';

export interface IOrderService {
  orders$: Observable<IOrder[]>;
  getOrder(): void;
  postOrder(order: IOrder);
  deleteOrder(id: number): void;
}
