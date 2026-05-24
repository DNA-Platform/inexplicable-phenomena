# Sprint 34 — Test Redesign: Every Test Tells a Story

## Framing

Each test should be embedded in something visually interesting — a small application or widget that makes the framework feature tangible. The code in the source panel should show elegant $Chemistry: a few small interacting classes where appropriate, demonstrating how chemicals compose.

This sprint is a DESIGN sprint. We redesign each test, batch them into implementation groups, and execute the highest-impact group. Future sprints pick up the rest.

## Design pass — every test gets a concept

| Current test | Current shape | Proposed redesign | Classes involved |
|---|---|---|---|
| **II.1/1** Click → counter | Solo counter | **Like button** — a post with a heart button and like count. Click ♥, count goes up. Familiar pattern, visually warm. | `$LikeButton` |
| **II.1/2** Two independent counters | Two bare counters | **Star ratings** — two products side by side, each with a 1-5 star rating. Click stars independently. | `$StarRating` |
| **II.4/1** Async loader | Loading text → element list | **Weather card** — shows "Loading forecast..." then reveals a 3-day forecast with icons. Visual phase transition. | `$WeatherCard` |
| **II.4/2** Timer | Start/stop/reset numbers | **Pomodoro timer** — a focus timer with a circular progress feel. Start/pause/reset. Counts up or down. | `$PomodoroTimer` |
| **II.5/1-4** Particularization | Assertion grids | **Error log** — a small error-log viewer where real Errors are wrapped as particles and displayed in a styled list. Each entry shows the error message + verification badges. | `$ErrorLog`, `$ErrorEntry` |
| **III.3/1** Typed children | Book with chapters | **Navigation menu** — a `$Nav` with typed `$NavItem` children. The bond constructor validates the structure. Renders as a real-looking nav bar. | `$Nav`, `$NavItem` |
| **III.3/2** Type validation error | Button to inject bad child | **Form builder** — drag (or click-to-add) fields into a form. Adding an invalid field type shows the validation error. | `$FormBuilder`, `$TextField`, `$InvalidWidget` |
| **V.1/1** Reactive counter | Counter with +/−/reset | Keep as-is — already tangible | `$Counter` |
| **V.1/2** Reactive text | Greeting as you type | Keep as-is — already tangible | `$GreetingDemo` |
| **V.1/3** Toggle visibility | Show/hide message | **Accordion FAQ** — click a question, the answer expands. Multiple questions, each independently toggleable. | `$FAQ`, `$Question` |
| **V.3/1** Cross-chemical write | Outer writes inner | **Master volume** — a main volume slider that controls the volume display on two speaker icons. One knob, two dependent outputs. | `$VolumeControl`, `$Speaker` |
| **V.3/2** Sibling isolation | Two independent siblings | **Dashboard widgets** — two side-by-side metric cards. Each has its own refresh button. Refreshing one doesn't affect the other. | `$MetricCard` |
| **V.4/1** Array.push | Pills appear | **Tag input** — type a tag, press Enter, it appears as a pill. Delete pills. Real-world pattern. | `$TagInput` |
| **V.4/2** Map.set | Key-value pills | **Settings editor** — add key=value settings to a config panel. Delete entries. | `$SettingsEditor` |
| **V.4/3** Set.add | Unique pills | **Feature flags** — toggle features on/off. Adding a duplicate is a no-op. | `$FeatureFlags` |
| **VI.1/1** Three independent mounts | Three counters | **Comment reactions** — three emoji reaction buttons (👍 😂 ❤️) each with independent counts. Same component, three mounts. | `$Reaction` |
| **VI.1/2** Shared state + host write | Host writes to copies | **Theme switcher** — a parent toggles dark/light mode. Two child preview cards both update. Local font-size adjustments per card stay independent. | `$ThemeSwitcher`, `$PreviewCard` |
| **Todo** | Full todo app | Keep as-is — already great | `$TodoApp` |
| **Nested** | Book with likes | Keep as-is — already good | `$Book`, `$Chapter`, `$Page` |

## Implementation batches

**Batch 1 (highest visual impact — do first):**
- V.1/3 → Accordion FAQ (replaces the abstract toggle)
- V.4/1 → Tag input (replaces pill demo)
- VI.1/1 → Emoji reactions (replaces bare counters)
- II.4/1 → Weather card (replaces plain loader)

**Batch 2 (multi-class interactions):**
- V.3/1 → Volume control with speakers
- III.3/1 → Navigation menu with typed items
- II.1/1 → Like button
- II.1/2 → Star ratings

**Batch 3 (specialized):**
- II.5/1-4 → Error log viewer
- III.3/2 → Form builder with validation
- V.3/2 → Dashboard metric cards
- V.4/2-3 → Settings editor + feature flags
- VI.1/2 → Theme switcher with preview cards
- II.4/2 → Pomodoro timer

## Code elegance rules

- Each test file should read like a tutorial example someone would want to copy
- Show `$Chemistry` patterns naturally, not forced
- Multi-class tests show composition: `$Nav` + `$NavItem`, `$VolumeControl` + `$Speaker`
- Keep the source panel focused — just the class definitions, no boilerplate
- The view should be immediately comprehensible without reading the code

## Ownership

- **Queenie** — reviews each redesign for testing rigor (does it still verify the framework feature?)
- **Phillip** — builds the chemicals and styled atoms
- **Gabby** — designs each mini-widget to look polished
- **Cathy** — consults on multi-class composition patterns
- **Libby** — updates any doc examples that reference old test shapes
