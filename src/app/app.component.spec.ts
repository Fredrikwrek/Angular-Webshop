import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockProductDataService } from './services/mock/mock-product-data.service';
import { ProductDataService } from './services/product-data.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ProductDataService, useClass: MockProductDataService },
        { provide: Router, useClass: RouterTestingModule },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FredriksWebShop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FredriksWebShop');
  });
  it('should receive categories', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.loadCategories();
    fixture.detectChanges();
    expect(app.categories.length).toBe(3);
  });
});
