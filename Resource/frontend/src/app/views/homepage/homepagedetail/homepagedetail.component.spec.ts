import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagedetailComponent } from './homepagedetail.component';

describe('HomepagedetailComponent', () => {
  let component: HomepagedetailComponent;
  let fixture: ComponentFixture<HomepagedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
