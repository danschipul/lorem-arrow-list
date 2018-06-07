import { TestBed, inject } from '@angular/core/testing';

import { TabContentsService } from './tab-contents.service';

describe('TabContentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabContentsService]
    });
  });

  it('should be created', inject([TabContentsService], (service: TabContentsService) => {
    expect(service).toBeTruthy();
  }));
});
