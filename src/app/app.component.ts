import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PoetryDBService } from './core/poetrydb.service';

/**
 * App bootstrap
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [PoetryDBService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /**
   * Title of the application.
   */
  title = 'poetry-pal';

  /**
   * @param router - the angular router.
   */
  constructor(private router: Router) {}

  /**
   * Navigate back to the search page whenever the logo is clicked.
   */
  public onLogoClicked() {
    this.router.navigate(['search']);
  }

  /**
   * Whenever a new route is activated, scroll to the top of the page.
   */
  onRouteActivated() {
    document.body.scrollTop = 0;
  }
}
