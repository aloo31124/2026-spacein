import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSiteContentComponent } from './search-site-content.component';

describe('SearchSiteContentComponent', () => {
  let component: SearchSiteContentComponent;
  let fixture: ComponentFixture<SearchSiteContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSiteContentComponent]
    });
    fixture = TestBed.createComponent(SearchSiteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
