# Sprint 12: Books

Build the book component hierarchy and test it at two levels: unit tests that push React simulation as far as it goes, and a minimal browser app for what simulation can't cover.

The book hierarchy is $Chemistry's canonical proof. A `$Book` receives typed children — `$Cover`, `$TableOfContents`, `$Chapter[]` — through the binding constructor. The book OWNS its chapters as objects, not as opaque DOM. It can count pages, build a TOC, reorder content. React can't do this because `children` is a blob. $Chemistry's binding constructor makes children typed.

## Status: NOT STARTED

Last updated: 2026-04-13

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Book components, unit tests, app scaffolding |
| Arthur | Architect | Workspace config, build boundaries, DI patterns |
| Libby | Librarian | Example extraction, doc links |

## Architecture

### The book hierarchy

```
$Book
  $Cover             — $title, $author, $image?
  $TableOfContents   — generated from chapters
  $Chapter[]         — binding constructor receives these
    $Page[]          — chapter binding constructor receives these

Subclasses:
  $Textbook extends $Book          — demands $TextbookChapter, adds exercises
  $Novel extends $Book              — page numbers, running headers
  $TextbookChapter extends $Chapter — has $Exercise[] children
  $IllustratedPage extends $Page    — has image + caption
  $CoffeeTableBook extends $Book   — large images, minimal text
```

### Where things live

```
library/chemistry/
  src/          — framework source (unchanged)
  tests/        — unit tests (expanded significantly)
    books/      — book component tests with React simulation
  app/          — browser test app (Vite, client-only)
    index.html
    vite.config.ts
    src/
      main.tsx
      books/    — book components used by both tests and app
```

### Hard split: unit tests vs browser app

**Unit tests (vitest + @testing-library/react + happy-dom):**
- render() + fireEvent: click chapter to expand, toggle view
- Binding constructors receiving typed children through JSX
- Polymorphic children ($TextbookChapter where $Chapter expected)
- TOC generated from chapter metadata
- Nested binding: Book > Chapter > Page
- Async lifecycle: lazy chapter loading via next('mount')
- Catalogue DI: register chapter types, look them up
- Re-render verification: method call → DOM updates
- Diffing: cached references returned for unchanged views

**Browser app (manual interaction only):**
- Visual layout: does the book look like a book?
- Scroll behavior within chapters
- Focus and keyboard navigation
- CSS/styling that happy-dom can't evaluate
- Performance in real rendering conditions

## Epics

### E1: Book components

Define the book hierarchy. Each class is a $Chemical with a binding constructor.

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | $Page, $Chapter, $Cover, $TableOfContents, $Book | Cathy | — | NOT STARTED |
| E1-S2 | $TextbookChapter, $Textbook (polymorphic subclass) | Cathy | E1-S1 | NOT STARTED |
| E1-S3 | $Novel, $CoffeeTableBook (more subclasses) | Cathy | E1-S1 | NOT STARTED |

### E2: Unit tests with React simulation

Push everything simulatable into vitest. Use render(), act(), fireEvent().

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Book renders with cover, TOC, and chapters | Cathy | E1-S1 | NOT STARTED |
| E2-S2 | Binding constructor receives typed $Chapter[] | Cathy | E1-S1 | NOT STARTED |
| E2-S3 | Polymorphic: $TextbookChapter works as $Chapter | Cathy | E1-S2 | NOT STARTED |
| E2-S4 | TOC generated from chapter metadata | Cathy | E1-S1 | NOT STARTED |
| E2-S5 | Click chapter to expand/collapse (fireEvent) | Cathy | E1-S1 | NOT STARTED |
| E2-S6 | Nested binding: Chapter receives $Page[] | Cathy | E1-S1 | NOT STARTED |
| E2-S7 | Async: lazy chapter loads via next('mount') | Cathy | E1-S1 | NOT STARTED |
| E2-S8 | Catalogue DI: register and resolve chapter types | Cathy/Arthur | E1-S1 | NOT STARTED |
| E2-S9 | Diffing: unchanged book returns cached reference | Cathy | E1-S1 | NOT STARTED |
| E2-S10 | $Textbook demands $TextbookChapter, validates | Cathy | E1-S2 | NOT STARTED |

### E3: Browser app scaffolding

Minimal Vite app for visual testing. Lives in library/chemistry/app/.

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Vite config, index.html, main.tsx | Arthur | — | NOT STARTED |
| E3-S2 | App shell: sidebar with test list, content area | Cathy | E3-S1 | NOT STARTED |
| E3-S3 | Book visual tests: render books, inspect layout | Cathy | E1-S1, E3-S2 | NOT STARTED |

### E4: Examples and docs

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | Book components as canonical examples | Libby | E1-S1 | NOT STARTED |
| E4-S2 | Update examples index with book hierarchy | Libby | E4-S1 | NOT STARTED |

## Verification

- [ ] Book hierarchy compiles and has binding constructors
- [ ] Unit tests use render() + fireEvent for interaction testing
- [ ] Polymorphic children work through the binding constructor
- [ ] TOC is generated from typed chapter references (not DOM scraping)
- [ ] Async chapter loading works via next('mount')
- [ ] Catalogue DI resolves chapter types
- [ ] Browser app runs with `npx vite` from library/chemistry
- [ ] Doug can open the browser app and see rendered books
- [ ] Library build (`npm run build`) ignores the app directory
- [ ] All existing 280 tests still pass
