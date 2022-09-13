import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegysterComponent } from './login-regyster.component';

describe('LoginRegysterComponent', () => {
  let component: LoginRegysterComponent;
  let fixture: ComponentFixture<LoginRegysterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegysterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegysterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
