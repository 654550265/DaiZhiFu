import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPicPage } from './show-pic.page';

describe('ShowPicPage', () => {
  let component: ShowPicPage;
  let fixture: ComponentFixture<ShowPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
