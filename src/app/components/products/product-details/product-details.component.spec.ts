import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { MockProductDataService } from 'src/app/services/mock/mock-product-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let service: ProductDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],

      providers: [
        { provide: ProductDataService, useClass: MockProductDataService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '55' }),
          },
        },
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
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be movie name film1', () => {
    service.getMovieData();
    expect(component.movie.name).toBe('film1');
  });
  it('should', async(() => {
    service.getMovieData();
    spyOn(component, 'addToCart');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.addToCart).toHaveBeenCalled();
    });
  }));
});
