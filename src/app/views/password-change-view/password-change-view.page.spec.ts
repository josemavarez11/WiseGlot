import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordChangeViewPage } from './password-change-view.page';

describe('PasswordChangeViewPage', () => {
  let component: PasswordChangeViewPage;
  let fixture: ComponentFixture<PasswordChangeViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
