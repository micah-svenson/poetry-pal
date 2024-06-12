import { Component, Input } from '@angular/core';
import { Poem } from '../../core/poetrydb.service';
import { PoemPreviewComponent } from './poem-preview/poem-preview.component';

/**
 * List of poem preview cards.
 */
@Component({
  selector: 'app-poem-list',
  standalone: true,
  imports: [PoemPreviewComponent],
  templateUrl: './poem-list.component.html',
  styleUrl: './poem-list.component.css',
})
export class PoemListComponent {
  /**
   * Poems to list.
   */
  @Input()
  public poems: Poem[] = [];
}
