import { TestBed } from '@angular/core/testing';

import { PoetryDBService } from './poetrydb.service';
import { HttpClient } from '@angular/common/http';

describe('PoetrydbService', () => {
  let service: PoetryDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj<HttpClient>('httpClient', ['get']),
        },
      ],
    });
    service = TestBed.inject(PoetryDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
