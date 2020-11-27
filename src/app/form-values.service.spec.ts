import { TestBed } from '@angular/core/testing';

import { FormValuesService } from './form-values.service';

describe('FormValuesService', () => {
  let service: FormValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
