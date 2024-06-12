import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
} from 'rxjs';
import { PoetryDBService } from '../../core/poetrydb.service';

/**
 * Poem search bar. Search by author or title.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgbDropdownModule, NgbTypeaheadModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  /**
   * Send search term as an event to parent.
   */
  @Output() public onSearch: EventEmitter<string> = new EventEmitter<string>();
  /**
   * The current search term.
   */
  public searchTerm: string = '';

  /**
   * @param poetrydb - The poetrydb service.
   */
  constructor(public poetrydb: PoetryDBService) {}

  /**
   * Enable querying for titles and authors while a user types in the search bar.
   * Searches for title and author simultaneously and returns the top 10 results for each.
   *
   * @param text$ - The text currently being input by the user.
   * @returns a stream of string arrays containing matching poem titles and/or authors.
   */
  public search = (text$: Observable<string>): Observable<string[]> => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((searchTerm) => {
        const author$ = this.poetrydb.searchAuthor(searchTerm).pipe(
          map((authors) => {
            return authors.slice(0, 10);
          })
        );
        const title$ = this.poetrydb.searchTitle(searchTerm).pipe(
          map((titles) => {
            return titles.slice(0, 10);
          })
        );

        return author$.pipe(
          combineLatestWith(title$),
          map((results) => results.flat().filter((val) => val !== undefined))
        );
      })
    );
  };

  /**
   * Handle events that should invoke a search. Emits search term to parent.
   *
   * @param event - (optional) suggestion menu will send an event containing the selected term.
   */
  public onSearchInvoked(event?: NgbTypeaheadSelectItemEvent) {
    const term = event?.item ? event.item : this.searchTerm;
    this.onSearch.emit(term);
  }
}
