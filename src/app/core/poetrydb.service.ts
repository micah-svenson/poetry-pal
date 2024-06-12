import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatestWith, map, of, tap } from 'rxjs';

/** Base url for the poetrydb API */
const baseURL = new URL('/', 'https://poetrydb.org');

/**
 * Note: In a larger project, and as API usage grows,
 * the types below would belong in another file such as poetrydb.model.ts
 */

/** Poem model */
export type Poem = {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
};

/** Type of Poetry API resource*/
export type ResourceType = 'author' | 'title';

/**
 * Consumable data from the poetrydb API.
 */
@Injectable({
  providedIn: 'root',
})
export class PoetryDBService {
  /**
   * Cache for latest poem results
   */
  private latestPoems: Map<PoemTitle, Poem> = new Map<PoemTitle, Poem>();

  /**
   * @param http - Angular provided http client
   */
  constructor(private http: HttpClient) {}

  /**
   * Search for Poems by Author and Title
   *
   * @param searchTerm - string container exact or partial author/title
   * @returns unique poems matching the search term. Returns empty array if no matches.
   */
  public searchPoem(searchTerm: string): Observable<Poem[]> {
    const titleResults$ = this._searchPoemByResource('title', searchTerm);
    const authorResults$ = this._searchPoemByResource('author', searchTerm);

    return titleResults$.pipe(
      combineLatestWith(authorResults$),
      map((results) => uniquePoems(results.flat())),
      tap(
        (results) =>
          (this.latestPoems = new Map(
            results.map((poem) => [poem.title, poem])
          ))
      )
    );
  }

  /**
   * Search for authors by partial or full name. Only returns author name.
   *
   * @param searchTerm - A partial or full author name.
   * @return Observable containing a list of unique author names. Returns empty array if no matches are found.
   */
  public searchAuthor(searchTerm: string): Observable<string[]> {
    return this.http
      .get<AuthorResponse[]>(
        new URL(`author/${searchTerm}/author`, baseURL).toString()
      )
      .pipe(
        map((result) => throwOnPoetryDBError(result)),
        map((authors) =>
          Array.from(new Set(authors.map((author) => author['author'])))
        ),
        catchError((_error, _caught) => of([]))
      );
  }

  /**
   * Search for titles by partial or full name. Only returns title name.
   *
   * @param searchTerm - A partial or full title name.
   * @return Observable containing a list of unique title names. Returns empty array if no matches are found.
   */
  public searchTitle(searchTerm: string): Observable<string[]> {
    return this.http
      .get<TitleResponse[]>(
        new URL(`title/${searchTerm}/title`, baseURL).toString()
      )
      .pipe(
        map((result) => throwOnPoetryDBError(result)),
        map((titles) =>
          Array.from(new Set(titles.map((title) => title['title'])))
        ),
        catchError((_error, _caught) => of([]))
      );
  }

  /**
   * Retrieve a poem using its title.
   * Prefer getting from cache, but fall back to the api when necessary.
   *
   * @param title - poem title
   * @returns Observable containing the poem if it exists. Observable returns undefined if the poem cannot be found.
   */
  public getPoemByTitle(title: string): Observable<Poem | undefined> {
    const cachedPoem = this.latestPoems.get(title);

    if (cachedPoem !== undefined) {
      return of(cachedPoem);
    }

    return this.searchPoem(title).pipe(
      map((poems) => poems.find((poem) => poem.title == title))
    );
  }

  /**
   * Find poems using either the title or author API resource.
   *
   * @param resource - The API resource to query. Supports "title" and "author".
   * @param term - The search term to use in the query. Value corresponds to the resource type.
   * @returns Observable list of poems. Empty list is returned with no matching results.
   */
  private _searchPoemByResource(
    resource: 'title' | 'author',
    term: string
  ): Observable<Poem[]> {
    return this.http
      .get<Poem[] | RequestFailure>(
        new URL(`${resource}/${term}`, baseURL).toString()
      )
      .pipe(
        map((result) => throwOnPoetryDBError(result)),
        catchError((error, _caught) => {
          console.warn('searchPoem: ', error);
          return of<Poem[]>([]);
        })
      );
  }
}

/** API response when only author name is requested */
type AuthorResponse = {
  author: string;
};

/** API response when only title name is requested */
type TitleResponse = {
  title: string;
};

/**
 * API response when a match cannot be found.
 * Returns a status 404 in the response even though the request itself is a 200.
 */
type RequestFailure = {
  status: number;
  reason: string;
};

/** Convenience type to make other declarations more readable. */
type PoemTitle = string;

/**
 *  Ensure a list of poems is unique based on the poem title.
 *
 * @param poems - A list of potentially non-unique poems
 * @returns a list of unique poems
 */
const uniquePoems = (poems: Poem[]) => {
  return Array.from(
    poems
      .reduce(
        (poemMap, poem) => poemMap.set(poem.title, poem),
        new Map<PoemTitle, Poem>()
      )
      .values()
  );
};

/**
 * Convert responses with non-200 status code into an observable error.
 *
 * @type T -  type of the API response.
 * @param result - API response or request failure object.
 * @returns API response, if response is valid
 * @throws if request failure object is passed with a non-200 status code.
 */
const throwOnPoetryDBError = <T extends Object>(result: T | RequestFailure) => {
  if ('status' in result && result.status != 200) {
    throw new Error(`PoetryDB request failed. ${JSON.stringify(result)}`);
  }

  return result as T;
};
