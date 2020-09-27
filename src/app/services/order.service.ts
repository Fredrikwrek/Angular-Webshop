import { Injectable } from '@angular/core';
import { IOrder, IPostOrder } from '../interfaces/i-order';
import { IOrderService } from '../interfaces/i-order-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService implements IOrderService {
  private orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something happened, please try again later.');
  }
  getOrder() {
    this.http
      .get(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?=9090'
      )
      .subscribe((orderData: IOrder[]) => {
        this.orders.next(orderData);
      });
  }
  postOrder(order: IPostOrder) {
    const response: Observable<IPostOrder> = this.http
      .post<IPostOrder>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
        order,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError(this.handleError));
    response.subscribe();
  }
  deleteOrder(id: number) {
    const response: Observable<{}> = this.http
      .delete(
        `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError(this.handleError));
    response.subscribe();
  }
}
