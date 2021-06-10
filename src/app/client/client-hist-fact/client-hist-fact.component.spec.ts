import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistFactComponent } from './client-hist-fact.component';

describe('ClientHistFactComponent', () => {
  let component: ClientHistFactComponent;
  let fixture: ComponentFixture<ClientHistFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHistFactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHistFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
