# PoetryPal

Welcome to PoetryPal! Your friend in foraging through flowing phrases.

PoetryPal is a simple website focused on surfacing poems from the poetrydb api by searching for a poem title or author.
After viewing search results, click on a poem to view it in full. Navigate back to the search by clicking on the PoetryPal logo.

## Setup

Note: This app was created using node 20.10.0 and npm 10.2.3. Please ensure your development environment has compatible versions.

1. Setup dependencies
   ```
   npm ci
   ```
2. Run the development server
   ```
   npx ng server
   ```
3. Run unit tests
   ```
   npx ng test
   ```

## Design Decisions

- Created a core singleton service wrapping the poetrydb api and serving data through observable streams.
  - Service retrieves unique list of authors and titles based on a search term to enable autocomplete in the search bar.
  - Service caches the latest results of a search so a user doesn't have to wait for a network request when viewing a poem in detail.
  - Errors are handled using rxjs and some response objects containing error codes are converted to errors in the observable stream and handled accordingly.
- Utilized ng-boostrap, bootstrap, and bootstrap-icons for styling.
  - Styling focused on a minimalist layout leveraging spacing and font properties.

## Improvements

- Add back navigation when in the detailed poem view. Currently, clicking the logo is the best way to navigate back to search.
- Add loading icon when search queries load slowly.
- Add a "back to top" button when scrolling down on long poems in the poem detail view.
- Add unit tests to cover user interactions and error handling logic in the poetrydb service.
- Add other tabs to the web page for different uses:
  - idea: Create a poetry mash up page. Allow a user to select multiple poems or authors and randomly generate a new poem based on those criteria.
  - idea: Search for authors and calculate and display statics about their poetry. e.g. total number of poems, average poem length, frequently used words, etc.
  - idea: Add a "discover" section that leverages the poetrydb API's ability to retrieve a random set of poems.
- Resolve alignment inconsistency between search results and search bar in some screen sizes.
- Paginate the API to enable more control over data fetching.
