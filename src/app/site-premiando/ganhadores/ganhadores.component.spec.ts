import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanhadoresComponent } from './ganhadores.component';

describe('GanhadoresComponent', () => {
  let component: GanhadoresComponent;
  let fixture: ComponentFixture<GanhadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanhadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanhadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
