import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthCallbackComponentComponent } from './oauth-callback-component.component';

describe('OauthCallbackComponentComponent', () => {
  let component: OauthCallbackComponentComponent;
  let fixture: ComponentFixture<OauthCallbackComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthCallbackComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthCallbackComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
