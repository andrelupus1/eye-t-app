import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartilhaPage } from './cartilha.page';

describe('CartilhaPage', () => {
  let component: CartilhaPage;
  let fixture: ComponentFixture<CartilhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartilhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartilhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
