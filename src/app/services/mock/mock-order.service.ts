import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from 'src/app/interfaces/i-order';
import { IOrderService } from 'src/app/interfaces/i-order-service';

@Injectable({
  providedIn: 'root',
})
export class MockOrderService implements IOrderService {
  orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();
  constructor() {}
  getOrder(): void {
    const mockOrder: IOrder[] = [
      {
        id: 999,
        companyId: 9090,
        created: '',
        createdBy: 'Mr. Tester',
        paymentMethod: 'Visa',
        totalPrice: 0,
        status: 0,
        orderRows: [
          {
            productId: 78,
            orderId: 0,
            amount: 199,
          },
        ],
      },
    ];
    this.orders.next(mockOrder);
  }
  postOrder(order: IOrder) {
  }
  deleteOrder(id: number): void {
  }
}
