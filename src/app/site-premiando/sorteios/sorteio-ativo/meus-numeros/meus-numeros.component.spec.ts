import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusNumerosComponent } from './meus-numeros.component';

describe('MeusNumerosComponent', () => {
  let component: MeusNumerosComponent;
  let fixture: ComponentFixture<MeusNumerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusNumerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
