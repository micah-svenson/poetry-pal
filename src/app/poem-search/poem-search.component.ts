import { Component, OnDestroy } from '@angular/core';
import { Poem, PoetryDBService } from '../core/poetrydb.service';
import { Subscription } from 'rxjs';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PoemListComponent } from './poem-list/poem-list.component';

/**
 * Web page for searching poems and viewing previews.
 */
@Component({
  selector: 'app-poem-search',
  standalone: true,
  imports: [SearchBarComponent, PoemListComponent],
  templateUrl: './poem-search.component.html',
  styleUrl: './poem-search.component.css',
})
export class PoemSearchComponent {
  /**
   * Poems currently in the search results.
   */
  public poems: Poem[] = [];
  /**
   * Indicate if a "no results found" placeholder should be displayed.
   */
  public isPoemListEmpty = false;

  /**
   * @param poetrydb - The poetrydb service.
   */
  constructor(private poetrydb: PoetryDBService) {}

  /**
   * Search and return poems matching a search term
   */
  public searchPoems(event: any) {
    this.poetrydb.searchPoem(event).subscribe((poems) => {
      this.isPoemListEmpty = poems.length == 0;
      this.poems = poems;
    });
  }
}
