import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaoTaskPage } from './taobao-task.page';

describe('TaobaoTaskPage', () => {
  let component: TaobaoTaskPage;
  let fixture: ComponentFixture<TaobaoTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaobaoTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaobaoTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
