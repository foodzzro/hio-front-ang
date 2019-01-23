import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraOptionListComponent } from './extra-option-list.component';

describe('ExtraOptionListComponent', () => {
  let component: ExtraOptionListComponent;
  let fixture: ComponentFixture<ExtraOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
