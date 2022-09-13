import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMinhasComprasComponent } from './view-minhas-compras.component';

describe('ViewMinhasComprasComponent', () => {
  let component: ViewMinhasComprasComponent;
  let fixture: ComponentFixture<ViewMinhasComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMinhasComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMinhasComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
