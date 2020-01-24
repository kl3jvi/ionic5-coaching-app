import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBasketComponent } from './shop-basket.component';

describe('ShopBasketComponent', () => {
  let component: ShopBasketComponent;
  let fixture: ComponentFixture<ShopBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBasketComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
