import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSettingsComponent } from './ac-settings.component';

describe('AcSettingsComponent', () => {
  let component: AcSettingsComponent;
  let fixture: ComponentFixture<AcSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
