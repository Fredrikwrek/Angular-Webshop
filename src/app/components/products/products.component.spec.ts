import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { MockProductDataService } from 'src/app/services/mock/mock-product-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let service: ProductDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductDataService, useClass: MockProductDataService },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientTestingModule }],
    });
    service = TestBed.inject(ProductDataService);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should receive movie', () => {
    service.getMovieData();
    expect(component.movies.length).toBe(3);
    expect(component.movies[2].name).toBe('film3');
  });
});
