import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindtaobaoPage } from './bindtaobao.page';

describe('BindtaobaoPage', () => {
  let component: BindtaobaoPage;
  let fixture: ComponentFixture<BindtaobaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindtaobaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindtaobaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
