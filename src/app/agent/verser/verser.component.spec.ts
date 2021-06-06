import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerserComponent } from './verser.component';

describe('VerserComponent', () => {
  let component: VerserComponent;
  let fixture: ComponentFixture<VerserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
