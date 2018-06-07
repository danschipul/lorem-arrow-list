import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabberListComponent } from './tabber-list.component';

describe('TabberListComponent', () => {
  let component: TabberListComponent;
  let fixture: ComponentFixture<TabberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
