import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutClientsComponent } from './ajout-clients.component';

describe('AjoutClientsComponent', () => {
  let component: AjoutClientsComponent;
  let fixture: ComponentFixture<AjoutClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
