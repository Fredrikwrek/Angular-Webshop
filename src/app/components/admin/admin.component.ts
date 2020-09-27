import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/interfaces/i-order';
import { OrderService } from 'src/app/services/order.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private accessGranted = false;
  orders: IOrder[] = [];

  login = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private loginService: LoginService,
    private orderService: OrderService,
    private productService: ProductDataService
  ) {}
  onLogin() {
    this.accessGranted = this.loginService.validateLogin(
      this.login.get('userName').value,
      this.login.get('password').value
    );
  }
  onLogout() {
    this.accessGranted = false;
    this.loginService.logOut();
  }
  getAccess(): boolean {
    this.accessGranted = this.loginService.getAccess();
    return this.accessGranted;
  }
  removeOrder(id: number) {
    this.orderService.deleteOrder(id);
    setTimeout(() => {
      this.orderService.getOrder();
    }, 1000);
  }
  productName(id: number): string {
    const product = this.productService.findMovie(id);
    return product.name;
  }

  ngOnInit(): void {
    this.productService.changeCurrentCategory(0);
    this.productService.getMovieData();
    this.orderService.getOrder();
    this.orderService.orders$.subscribe((orderData) => {
      this.orders = orderData;
    });
  }
}
