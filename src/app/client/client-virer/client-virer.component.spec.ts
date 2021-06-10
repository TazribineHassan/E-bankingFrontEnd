import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVirerComponent } from './client-virer.component';

describe('ClientVirerComponent', () => {
  let component: ClientVirerComponent;
  let fixture: ComponentFixture<ClientVirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVirerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
