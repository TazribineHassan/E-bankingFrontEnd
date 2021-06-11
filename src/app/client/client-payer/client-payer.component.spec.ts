import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPayerComponent } from './client-payer.component';

describe('ClientPayerComponent', () => {
  let component: ClientPayerComponent;
  let fixture: ComponentFixture<ClientPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
