import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteiosComponent } from './sorteios.component';

describe('SorteiosComponent', () => {
  let component: SorteiosComponent;
  let fixture: ComponentFixture<SorteiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
