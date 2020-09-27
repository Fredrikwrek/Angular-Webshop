import { TestBed } from '@angular/core/testing';

import { MockOrderService } from './mock-order.service';

describe('MockOrderService', () => {
  let service: MockOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
