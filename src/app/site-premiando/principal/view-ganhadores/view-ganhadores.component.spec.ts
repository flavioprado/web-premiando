import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGanhadoresComponent } from './view-ganhadores.component';

describe('ViewGanhadoresComponent', () => {
  let component: ViewGanhadoresComponent;
  let fixture: ComponentFixture<ViewGanhadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGanhadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGanhadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
