import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindcardPage } from './bindcard.page';

describe('BindcardPage', () => {
  let component: BindcardPage;
  let fixture: ComponentFixture<BindcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindcardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
