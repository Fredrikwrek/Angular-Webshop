import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { ProductDataService } from './product-data.service';

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientTestingModule }]
    });
    service = TestBed.inject(ProductDataService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
