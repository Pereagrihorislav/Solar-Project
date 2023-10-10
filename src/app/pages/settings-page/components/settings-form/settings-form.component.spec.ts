import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormComponent } from './settings-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SettingsFormComponent', () => {
  let component: SettingsFormComponent;
  let fixture: ComponentFixture<SettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SettingsFormComponent]
    });
    fixture = TestBed.createComponent(SettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
