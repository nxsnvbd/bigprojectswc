import { TestBed } from '@angular/core/testing';
import { QuantityService } from './quantity.services';

describe('QuantityServices', () => {
  let service: QuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});