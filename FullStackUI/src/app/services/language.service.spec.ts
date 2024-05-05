import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { HttpClientModule } from '@angular/common/http';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
