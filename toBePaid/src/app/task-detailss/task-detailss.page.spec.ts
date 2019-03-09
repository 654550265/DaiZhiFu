import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailssPage } from './task-detailss.page';

describe('TaskDetailssPage', () => {
  let component: TaskDetailssPage;
  let fixture: ComponentFixture<TaskDetailssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailssPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
