import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccuielComponent } from './client-accuiel.component';

describe('ClientAccuielComponent', () => {
  let component: ClientAccuielComponent;
  let fixture: ComponentFixture<ClientAccuielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccuielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccuielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
