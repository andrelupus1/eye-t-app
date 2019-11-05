import { TestBed } from '@angular/core/testing';

import { ColetaService } from './coleta.service';

describe('ColetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColetaService = TestBed.get(ColetaService);
    expect(service).toBeTruthy();
  });
});
