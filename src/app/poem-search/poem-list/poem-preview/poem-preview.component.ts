import { Component, Input } from '@angular/core';
import { Poem } from '../../../core/poetrydb.service';
import { RouterLink, RouterOutlet } from '@angular/router';

/** The base angular route for a poem */
const basePoemRoute = '/poem';

/**
 * Preview card for a poem.
 */
@Component({
  selector: 'app-poem-preview',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './poem-preview.component.html',
  styleUrl: './poem-preview.component.css',
})
export class PoemPreviewComponent {
  /**
   * Route to view the current poem preview in detail.
   */
  public poemRoute = basePoemRoute;
  /**
   * The poem to preview.
   */
  public _poem: Poem = {
    title: '',
    author: '',
    lines: [],
    linecount: '',
  };
  /**
   * Input setter for the preview poem.
   */
  @Input()
  set poem(poem: Poem) {
    this._poem = poem;
    this.poemRoute = `${basePoemRoute}/${poem.title}`;
  }
}
