import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardInfoPage } from './id-card-info.page';

describe('IdCardInfoPage', () => {
  let component: IdCardInfoPage;
  let fixture: ComponentFixture<IdCardInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
