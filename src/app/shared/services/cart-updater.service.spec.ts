import {TestBed} from '@angular/core/testing';

import {CartUpdaterService} from './cart-updater.service';

describe('CartUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartUpdaterService = TestBed.get(CartUpdaterService);
    expect(service).toBeTruthy();
  });
});
