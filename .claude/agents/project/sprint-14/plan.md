# Sprint 14: The Showcase

A book world that tests $Chemistry. Not a test runner with books — a living bookshelf where every interaction implicitly verifies a framework assumption. The books ARE the tests. The bookshelf IS the test suite.

Made with love.

## Status: NOT STARTED

Last updated: 2026-04-13

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Book components, bookshelf, interactions, code viewer |
| Arthur | Architect | App architecture, navigation, test coverage mapping |
| Libby | Librarian | Test descriptions, book content, guidance text |

## What needs testing in real React

These are assumptions we can't fully verify in unit tests. Each maps to a book interaction.

| Assumption | Book interaction that tests it |
|-----------|-------------------------------|
| Re-render on click | Click a recipe, it expands. Click a chapter, it opens. |
| Instance independence | Two bookshelves side by side. Interact with one. Other is untouched. |
| Performance with deep trees | Bookshelf with 20 books, each with chapters. No jank. |
| Nested binding constructors | Bookshelf > Book > Chapter > Content — all through JSX |
| Polymorphic rendering | Novel, cookbook, textbook on the same shelf — different appearance, same parent |
| Parent affects child rendering | Book on shelf renders as spine. Off shelf renders as full book. |
| Lifecycle / lazy loading | Book content loads when opened, not when shelf renders |
| Style inheritance through subclass | Cookbook recipe vs vegan recipe. Novel chapter vs novel epigraph. |
| Rapid interaction | Click through many chapters quickly. Each responds. No stale state. |
| Computed state from children | Bookshelf shows "12 books, 847 pages total" from typed children |

## The book world

### Components

```
$Bookshelf
    $Book[]
        $Cover
        $TableOfContents
        $Chapter[]

$Novel extends $Book
    $NovelChapter extends $Chapter
        — has epigraph, flowing prose

$Cookbook extends $Book
    $Recipe extends $Chapter
        $Ingredient[]
        $Step[]
    $VeganRecipe extends $Recipe

$Textbook extends $Book
    $TextbookChapter extends $Chapter
        $Exercise[]

$ReadingList
    — tracks which books are opened, which chapters read
```

### Navigation

The app opens to a bookshelf. The bookshelf shows book spines. Click a spine to open the book. Inside the book: table of contents, click chapters to read them.

A persistent "Tests" tab or panel lists what's being tested and whether you've verified it. Each test links to the interaction that demonstrates it. Click a test, the app navigates to the relevant book and highlights what to do.

### Code viewer

Any component can toggle to show its source code. A "View Source" button on each book/chapter reveals the `$Chemistry` code that defines it. Uses Vite `?raw` imports and syntax highlighting.

## Epics

### E1: Foundation

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Install syntax highlighting package | Arthur | — | NOT STARTED |
| E1-S2 | Design system — styled-components, typography, color palette | Cathy | — | NOT STARTED |
| E1-S3 | CodeViewer component — ?raw import, syntax highlight, collapsible | Cathy | E1-S1 | NOT STARTED |
| E1-S4 | App shell — bookshelf view, book view, navigation | Cathy | E1-S2 | NOT STARTED |
| E1-S5 | Test panel — lists assumptions, links to interactions | Arthur | E1-S4 | NOT STARTED |

### E2: The bookshelf

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | $Bookshelf — contains books, renders spines, computed stats | Cathy | E1-S4 | NOT STARTED |
| E2-S2 | Book spine view vs open view — parent affects rendering | Cathy | E2-S1 | NOT STARTED |
| E2-S3 | Multiple shelves — instance independence | Cathy | E2-S1 | NOT STARTED |

### E3: Book types

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | $Novel — chapters with epigraphs, flowing prose | Cathy | E2-S1 | NOT STARTED |
| E3-S2 | $Cookbook — recipes with ingredients and steps (existing, polish) | Cathy | E2-S1 | NOT STARTED |
| E3-S3 | $Textbook — chapters with exercises, reveal answers | Cathy | E2-S1 | NOT STARTED |

### E4: Advanced interactions

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | Lazy book loading — content loads on open | Cathy | E3-S1 | NOT STARTED |
| E4-S2 | $ReadingList — tracks opened books and read chapters | Cathy | E3-S1 | NOT STARTED |
| E4-S3 | Rapid interaction — click through many chapters quickly | Cathy | E3-S1 | NOT STARTED |
| E4-S4 | Code viewer integration — View Source on any book component | Cathy | E1-S3 | NOT STARTED |

### E5: Content and writing

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E5-S1 | Novel content — real excerpts or original prose | Libby | E3-S1 | NOT STARTED |
| E5-S2 | Cookbook content — real recipes (existing, refine) | Libby | E3-S2 | NOT STARTED |
| E5-S3 | Textbook content — real questions and exercises | Libby | E3-S3 | NOT STARTED |
| E5-S4 | Test descriptions — what each interaction verifies | Libby | E1-S5 | NOT STARTED |

### E6: Verification and polish

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E6-S1 | Puppeteer: verify every interaction works | Cathy | E4-S3 | NOT STARTED |
| E6-S2 | Performance: no jank on bookshelf with 20 books | Cathy | E6-S1 | NOT STARTED |
| E6-S3 | Visual polish — the app should feel like a real product | All | E6-S1 | NOT STARTED |
| E6-S4 | Doug walkthrough — present the app, get feedback | All | E6-S3 | NOT STARTED |

## Verification

- [ ] Bookshelf renders with multiple book types
- [ ] Click a spine to open a book
- [ ] Books on shelf render differently than open books
- [ ] Two bookshelves have independent state
- [ ] Novel, cookbook, textbook look distinct through polymorphism
- [ ] Cookbook computes total time from recipe children
- [ ] Click recipe/chapter to expand — re-render works
- [ ] Rapid clicking doesn't cause stale state
- [ ] Lazy book content loads after opening
- [ ] Code viewer shows real source code, syntax-highlighted
- [ ] Test panel lists all assumptions with links to interactions
- [ ] No jank with 20 books on shelf
- [ ] App is beautiful enough that Doug wants to show people
