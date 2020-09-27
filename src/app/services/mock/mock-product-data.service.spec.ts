import { TestBed } from '@angular/core/testing';

import { MockProductDataService } from './mock-product-data.service';

describe('MockProductDataService', () => {
  let service: MockProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
