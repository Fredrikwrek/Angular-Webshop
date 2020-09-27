import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockOrderService } from 'src/app/services/mock/mock-order.service';
import { OrderService } from 'src/app/services/order.service';

import { CheckOutComponent } from './check-out.component';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutComponent],
      providers: [{ provide: OrderService, useClass: MockOrderService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
