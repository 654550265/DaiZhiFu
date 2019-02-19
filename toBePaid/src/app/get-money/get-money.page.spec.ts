import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMoneyPage } from './get-money.page';

describe('GetMoneyPage', () => {
  let component: GetMoneyPage;
  let fixture: ComponentFixture<GetMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
