import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockOrderService } from 'src/app/services/mock/mock-order.service';
import { MockProductDataService } from 'src/app/services/mock/mock-product-data.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductDataService } from 'src/app/services/product-data.service';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        { provide: ProductDataService, useClass: MockProductDataService },
        { provide: OrderService, useClass: MockOrderService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
