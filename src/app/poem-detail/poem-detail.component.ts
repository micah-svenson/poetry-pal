import { Component, Input, OnInit } from '@angular/core';
import { Poem, PoetryDBService } from '../core/poetrydb.service';

/**
 * View the full poem as well as poem metadata
 */
@Component({
  selector: 'app-poem-detail',
  standalone: true,
  imports: [],
  templateUrl: './poem-detail.component.html',
  styleUrl: './poem-detail.component.css',
})
export class PoemDetailComponent implements OnInit {
  /**
   * Poem title. Passed as input via router params.
   */
  @Input() title!: string;
  /**
   * The poem to be viewed.
   */
  poem: Poem | undefined;

  /**
   * @param poetrydb - The poetrydb service.
   */
  constructor(private poetrydb: PoetryDBService) {}

  ngOnInit(): void {
    this.poetrydb.getPoemByTitle(this.title).subscribe((poem) => {
      this.poem = poem;
    });
  }
}
