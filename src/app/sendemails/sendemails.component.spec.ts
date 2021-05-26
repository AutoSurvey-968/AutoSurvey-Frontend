import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendemailsComponent } from './sendemails.component';

describe('SendemailsComponent', () => {
  let component: SendemailsComponent;
  let fixture: ComponentFixture<SendemailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendemailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendemailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
