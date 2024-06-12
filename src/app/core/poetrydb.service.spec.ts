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

  describe('searchPoem', () => {
    it('should search title and author endpoint and combine results', () => {
      // Create spies for title and author endpoint that return unique results
      // Assert that resulting poem list contains results from both api end points
    });
    it('should return unique results', () => {
      // Create spies for title and author endpoint that contain duplicate data.
      // Assert that duplicates from the resulting poem list have been removed.
    });
    it('should handle api status response as error', () => {
      // Create a spy for author or title and have it return an error object
      // of the form {status: 404, reason: "Not Found"}.
      // Assert that the search result is an empty array.
      // Optionally, assert that console.warn is called with the error description.
    });
    // In the future, add tests for more specific error cases if
    // handling should be different. i.e. handling and surfacing a 403 Forbidden error
    // to let a user know there is a problem with api access.
  });

  describe('searchAuthor', () => {
    it('should search author endpoint for author names', () => {
      // Create spies for author endpoint that returns only a set of author names.
      // Assert that results are a list of author names.
    });
    it('should return unique results', () => {
      // Create spies for author endpoint that contain duplicate author data.
      // Assert that duplicates from the resulting author list have been removed.
    });
    it('should handle api status response as error', () => {
      // Create a spy for author endpoint and have it return an error object
      // of the form {status: 404, reason: "Not Found"}.
      // Assert that the search result is an empty array.
      // Optionally, assert that console.warn is called with the error description.
    });
  });
  describe('searchTitle', () => {
    it('should search title endpoint for title names', () => {
      // Create spies for title endpoint that returns only a set of title names.
      // Assert that results are a list of title names.
    });
    it('should return unique results', () => {
      // Create spies for title endpoint that contain duplicate title data.
      // Assert that duplicates from the resulting title list have been removed.
    });
    it('should handle api status response as error', () => {
      // Create a spy for title endpoint and have it return an error object
      // of the form {status: 404, reason: "Not Found"}.
      // Assert that the search result is an empty array.
      // Optionally, assert that console.warn is called with the error description.
    });
  });

  describe('getPoemByTitle', () => {
    it('should get poem from cache', () => {
      // Populate the poem cache by calling `searchPoem` (with httpClient mocked and returning fake poems.)
      // Assert that the correct poem is returned.
      // Assert that the HttpClient.get method was not called.
    });
    it('should get poem from api on cache miss', () => {
      // Call getPoemByTitle without pre-populating any data in the service, but ensure HttpClient is mocked.
      // Assert that the correct poem is returned.
      // Assert that the HttpClient.get method was called.
    });
    it('should return undefined when no poem is found', () => {
      // Call getPoemByTitle without pre-populating any data in the service and mock HttpClient such that no result is returned..
      // Assert that the undefined is returned.
      // Assert that the HttpClient.get method was called.
    });
  });
});
