import { Component, OnInit } from '@angular/core';
import { IPostOrder } from 'src/app/interfaces/i-order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  paymentDone = false;
  order: IPostOrder = {
    companyId: 9090,
    created: '',
    createdBy: '',
    paymentMethod: '',
    totalPrice: 0,
    status: 0,
    orderRows: [],
  };
  paymentMethods = [
    { name: 'MasterCard', paymentMethod: 'MasterCard' },
    { name: 'Visa', paymentMethod: 'Visa' },
    { name: 'Invoice', paymentMethod: 'Invoice' },
  ];
  checkOutForm = new FormGroup({
    createdBy: new FormControl('', [
      Validators.required,
      //regex Angular email validation pattern
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    paymentMethods: new FormControl(this.paymentMethods, Validators.required),
  });
  constructor(
    private orderService: OrderService,
    private cartSerivce: CartService
  ) {}

  submitOrder() {
    this.order = {
      ...this.order,
      created: new Date().toDateString(),
      createdBy: this.checkOutForm.get('createdBy').value,
      paymentMethod: this.checkOutForm.get('paymentMethods').value,
      orderRows: this.cartSerivce
        .receiveFromCart()
        .products.map((item, index) => {
          return {
            productId: item.productId,
            orderId: index,
            amount: item.amount,
          };
        }),
    };
    this.orderService.postOrder(this.order);
    this.paymentDone = true;
    this.cartSerivce.clearCart();
  }
  ngOnInit(): void {
    this.order.totalPrice = this.cartSerivce.receiveFromCart().totalPrice;
    this.checkOutForm.controls['paymentMethods'].setValue(
      this.paymentMethods[0].paymentMethod
    );
  }
}
