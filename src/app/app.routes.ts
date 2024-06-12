import { Routes } from '@angular/router';
import { PoemDetailComponent } from './poem-detail/poem-detail.component';
import { PoemSearchComponent } from './poem-search/poem-search.component';

export const routes: Routes = [
  { path: 'poem/:title', component: PoemDetailComponent },
  { path: 'search', component: PoemSearchComponent },
  { path: '', component: PoemSearchComponent },
];
