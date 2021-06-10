import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistVersComponent } from './client-hist-vers.component';

describe('ClientHistVersComponent', () => {
  let component: ClientHistVersComponent;
  let fixture: ComponentFixture<ClientHistVersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHistVersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHistVersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
