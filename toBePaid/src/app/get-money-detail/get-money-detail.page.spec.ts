import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMoneyDetailPage } from './get-money-detail.page';

describe('GetMoneyDetailPage', () => {
  let component: GetMoneyDetailPage;
  let fixture: ComponentFixture<GetMoneyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMoneyDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMoneyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
