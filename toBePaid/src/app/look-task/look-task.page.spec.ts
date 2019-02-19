import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookTaskPage } from './look-task.page';

describe('LookTaskPage', () => {
  let component: LookTaskPage;
  let fixture: ComponentFixture<LookTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
