import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistVirmComponent } from './client-hist-virm.component';

describe('ClientHistVirmComponent', () => {
  let component: ClientHistVirmComponent;
  let fixture: ComponentFixture<ClientHistVirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHistVirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHistVirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
