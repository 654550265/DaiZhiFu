import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardInfoSurePage } from './id-card-info-sure.page';

describe('IdCardInfoSurePage', () => {
  let component: IdCardInfoSurePage;
  let fixture: ComponentFixture<IdCardInfoSurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardInfoSurePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardInfoSurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
