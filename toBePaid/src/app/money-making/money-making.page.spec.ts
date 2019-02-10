import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMakingPage } from './money-making.page';

describe('MoneyMakingPage', () => {
  let component: MoneyMakingPage;
  let fixture: ComponentFixture<MoneyMakingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyMakingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyMakingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
