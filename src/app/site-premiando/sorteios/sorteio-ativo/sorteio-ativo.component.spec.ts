import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteioAtivoComponent } from './sorteio-ativo.component';

describe('SorteioAtivoComponent', () => {
  let component: SorteioAtivoComponent;
  let fixture: ComponentFixture<SorteioAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteioAtivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteioAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
