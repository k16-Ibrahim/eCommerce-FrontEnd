import { TestBed } from '@angular/core/testing';

import { ShopItService } from './shop-it.service';

describe('ShopItService', () => {
  let service: ShopItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
