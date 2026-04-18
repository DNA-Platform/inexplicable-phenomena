# Showcase App Test Plan

Every test has: what the user DOES, what they SEE, and what framework assumption it verifies.

## Category 1: Props & Display

### 1.1 Prop Passing
**Do:** Look at the book title.
**See:** "Home Cooking" — not "Untitled" or empty.
**Verifies:** `$apply` maps JSX props to `$`-prefixed properties.

### 1.2 Multiple Props
**Do:** Look at the recipe header.
**See:** Title, prep time, cook time, total time — all from separate props.
**Verifies:** Multiple props applied in one render cycle.

### 1.3 Computed Properties
**Do:** Look at the cookbook header.
**See:** "3 recipes · 67 minutes total" — computed from child objects.
**Verifies:** Typed composition. Parent reads children's properties.

## Category 2: Interaction & Re-Render

### 2.1 Click to Expand
**Do:** Click a recipe header (▸).
**See:** Ingredients and steps appear. Arrow changes to ▾.
**Verifies:** `$Bonding` wraps `toggle()`. `$update$` triggers re-render. View reflects new state.

### 2.2 Click to Collapse
**Do:** Click the same header again.
**See:** Content disappears. Arrow returns to ▸.
**Verifies:** Toggle state persists across renders. Re-render produces correct output.

### 2.3 Rapid Clicking
**Do:** Click a recipe header many times quickly.
**See:** Alternates between expanded/collapsed. No glitching. No stale state.
**Verifies:** Re-render pipeline handles rapid updates. Reconcile cache doesn't interfere.

## Category 3: Instance Independence

### 3.1 Two Components, Same Template
**Do:** Look at two cookbooks side by side.
**See:** Both render with their own titles, recipes, and stats.
**Verifies:** `Object.create(template)` produces separate instances. `useRef` stores per-mount.

### 3.2 Independent Interaction
**Do:** Expand a recipe in Kitchen A.
**See:** Kitchen B is unaffected.
**Verifies:** State is per-instance, not shared through prototype.

## Category 4: Polymorphism

### 4.1 Subclass Visual Difference
**Do:** Look at the vegan recipe (🌱).
**See:** Green left border. Subtle green tint. The 🌱 indicator.
**Verifies:** `$VeganRecipe` overrides `Card` and `Header` properties. Styled-component composition works.

### 4.2 Parent Doesn't Know
**Do:** Look at the cookbook containing both regular and vegan recipes.
**See:** Both render correctly. The cookbook shows the right count and total time for both.
**Verifies:** Parent treats `$VeganRecipe` as `$Recipe` through polymorphism. `$check` accepts subclasses.

## Category 5: Binding Constructor

### 5.1 Typed Children from JSX
**Do:** Look at the cookbook. It has recipes. Each recipe has ingredients and steps.
**See:** Three levels of composition. Cookbook > Recipe > Ingredient/Step.
**Verifies:** The orchestrator processes JSX children at each level. Binding constructors fire.

### 5.2 Wrong Type Rejected
**Do:** (Shown in error test) Pass a non-Recipe child to a Cookbook.
**See:** A clear error message naming the expected and received types.
**Verifies:** `$check` validates at runtime. `$ParamValidation` produces readable errors.

## Category 6: Lifecycle

### 6.1 Lazy Loading
**Do:** Open a book whose content loads after mount.
**See:** Loading indicator → content appears.
**Verifies:** `await this.next('mount')` resolves after component mounts. Async state update triggers re-render.

### 6.2 Timer / Continuous Update
**Do:** Start a timer component.
**See:** Counter increments every second.
**Verifies:** Ongoing async loop triggers repeated re-renders. `$update$` works from async code.

## Category 7: Code Viewer

### 7.1 View Source
**Do:** Click "View Source" on any test.
**See:** Syntax-highlighted TypeScript showing the $Chemistry class definition, side by side with the live component.
**Verifies:** (Not a framework test — an app feature for comprehension.)

## Category 8: Performance

### 8.1 Large Collection
**Do:** View a bookshelf with 20+ books.
**See:** Renders without visible delay. Scrolling is smooth.
**Verifies:** Object.create instances are lightweight. No excessive overhead per component.

## Summary

18 tests across 8 categories. Each test is a user action + expected result + framework assumption.
