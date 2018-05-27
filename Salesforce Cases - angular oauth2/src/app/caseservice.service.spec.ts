import { TestBed, inject } from '@angular/core/testing';

import { CaseserviceService } from './caseservice.service';

describe('CaseserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseserviceService]
    });
  });

  it('should be created', inject([CaseserviceService], (service: CaseserviceService) => {
    expect(service).toBeTruthy();
  }));
});
