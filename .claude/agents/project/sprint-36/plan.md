# Sprint 36 — Test the Tests: MCP-Driven DOM Verification

## The problem

We built 35 tests but never systematically clicked through them. The very first test (Like Button) doesn't work — Doug found it in seconds. We verify with puppeteer scripts that check text content, but we never simulate real user interaction: click this button, verify this number changed, type in this field, verify this output updated.

## The solution

An MCP server that drives the browser and exercises every test in the Lab. It does what Doug does: navigate, click, type, read, verify. When it finds a broken test, it reports exactly what failed.

## Architecture

### The MCP server

A tool server (Node.js) that exposes browser-control actions:

| Tool | What it does |
|------|-------------|
| `navigate(section)` | Navigate to a section by ID |
| `click(selector)` | Click an element matching CSS selector or text |
| `type(selector, text)` | Type into an input |
| `read(selector)` | Read text content of an element |
| `readVerdicts()` | Read all verdict states on the current page |
| `screenshot()` | Take a screenshot and return it |
| `waitFor(selector, timeout)` | Wait for an element to appear |

Built on Puppeteer (already a devDep). Runs as a persistent browser session.

### The test-the-tests runner

A script that:
1. Starts the dev server
2. Opens the browser via the MCP server
3. For each section:
   a. Navigate to the section
   b. Read initial verdict states (should be pending or auto-pass)
   c. For each interactive test: perform the interaction (click button, type text, drag slider)
   d. Read verdict states after interaction (should be pass)
   e. Report any test that stays pending or shows fail
4. Produces a report: which tests work, which are broken

### The interaction catalog

Each test needs a script that says how to exercise it:

| Section | Test | Interaction | Expected verdict |
|---------|------|-------------|-----------------|
| II.1 | Like button | Click ♥ | pass: likes > 0 |
| II.1 | Star rating | Click 3rd star on first rating | pass: rating > 0 |
| II.4 | Weather card | Wait 2s | pass: forecast loaded |
| II.4 | Pomodoro timer | Click Start, wait 1s | pass: seconds < 25*60 |
| II.5 | Particularization (all 4) | None — auto-pass | pass on load |
| III.3 | Typed children | None — auto-pass | pass on load |
| III.3 | Type validation | Click "pass invalid child" | pass: error shown |
| V.1 | Counter | Click + | pass: count > 0 |
| V.1 | Greeting | Type "Doug" | pass: name entered |
| V.1 | FAQ | Click first question | pass: expanded |
| V.3 | Volume slider | Drag slider right | pass: volume > 0 |
| V.3 | Dashboard | Click Refresh on first card | pass: refreshed |
| V.4 | Tag input | Type "test", press Enter | pass: tag added |
| V.4 | Settings editor | Type key + value, click Set | pass: config.size > 0 |
| V.4 | Feature flags | Click first toggle | pass: flag enabled |
| VI.1 | Emoji reactions | Click 👍 | pass: count > 0 |
| VI.1 | Theme switcher | Click dark toggle | pass: dark mode |
| todo | Todo list | Type "test", click Add | pass: items > 0 |
| nested | Nested book | Click ♥ on any page | pass: likes > 0 |
| form | Contact form | Fill name + email + message, click Submit | pass: submitted |
| notif | Notifications | Click Info | pass: toast created |
| stress | Rapid-fire | Click Run | pass: count === 100 |
| mount | Conditional mount | Click toggle | pass: child mounted |
| prop-pass | Chemical as prop | Click widget button | pass: interaction works |
| dynamic | Dynamic creation | Click Add item | pass: items > 0 |
| rekey | List reorder | Click + on an item, click Shuffle | pass: items visible |
| propchange | Color picker | Drag hue slider | pass: hue > 0 |
| async-bind | Async binding | Click "Delayed update", wait 2s | pass: status changed |
| deep-nest | Deep nesting | Click ♥ on card | pass: totalLikes > 0 |
| error-recover | Error recovery | Click Trigger Error, then Reset | pass: recovered |
| cond-swap | Conditional swap | Click Editor tab | pass: mode toggled |
| method-fc | Method to FC | Click button | pass: count > 0 |

## Deliverables

1. MCP server at `library/chemistry/app/mcp-server.ts`
2. Interaction catalog at `library/chemistry/app/test-interactions.ts`
3. Runner script at `library/chemistry/app/verify-all.mjs`
4. Fix every broken test the runner discovers (Like Button first)

## Ownership

- **Queenie** — defines the interaction catalog (what to click, what to verify)
- **Phillip** — builds the MCP server and runner
- **Cathy** — fixes any framework bugs the runner surfaces
- **Gabby** — fixes any visual/styling issues
- **Arthur** — orchestrates

## Sprint goal

Every test in the Lab is verified by automated interaction. Zero broken tests. Doug opens the app and every click works.
