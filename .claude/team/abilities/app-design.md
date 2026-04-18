# App Design

Visual and interaction design principles for building interfaces with $Chemistry and styled-components. Covers visual hierarchy, interaction patterns, color, typography, and the specific patterns that make $Chemistry apps distinctive.

---

## Visual Hierarchy

The eye reads in a Z-pattern on unfamiliar pages and an F-pattern on content-heavy pages. Design for both.

**Primary focus:** The thing the user came to see. It gets the most visual weight — size, contrast, position.
**Secondary focus:** Context that supports the primary. Smaller, lighter, adjacent.
**Tertiary focus:** Navigation, metadata, tools. Present but not competing.

In the $Chemistry app:
- **Primary:** The live component (the book, the recipe, the interactive thing)
- **Secondary:** The test description (what's being tested, what to do)
- **Tertiary:** Navigation (sidebar), code viewer, pass/fail criteria

### Squint test
Blur your eyes. Can you tell what's important? If everything is the same visual weight, nothing is important.

---

## Interaction Patterns

### Affordances
Things that are clickable must LOOK clickable:
- Cursor changes to pointer
- Hover state is visible (color shift, underline, shadow)
- Active state confirms the click (brief color flash, toggle indicator)

### Feedback loops
Every action gets a response:
- Click to expand → content appears immediately, with a state indicator (▸ becomes ▾)
- Click a nav item → it highlights, content changes
- Hover → subtle visual shift

### Progressive disclosure
Show the essential. Hide the rest behind intentional interaction:
- Recipe starts collapsed — title and metadata visible
- Click to expand — ingredients and steps appear
- "View Source" toggles the code panel

---

## Styled-Components Patterns

### Semantic naming
```typescript
const RecipeHeader = styled.header`...`;  // what it IS
const ExpandIndicator = styled.span`...`;  // what it DOES
```
Not `StyledDiv3` or `Wrapper`. Names describe the thing.

### Composition through extension
```typescript
const VeganHeader = styled(RecipeHeader)`
    border-left: 3px solid #4caf50;
`;
```
Subclass styling in $Chemistry mirrors `styled()` composition. The pattern is consistent: override to customize.

### Theme through class properties
$Chemistry chemicals define styled-components as class properties. Subclasses override them. The view reads from `this`. No ThemeProvider, no context.

---

## Color

### Functional color
- **Red accent (#c0392b):** Brand, attention, the `$` in $Chemistry
- **Green (#4caf50):** Success, pass, vegan/eco indicators
- **Red text (#c62828):** Failure, error
- **Warm grays (#8a7d6b, #6b5d4a):** Secondary text, borders
- **Warm white (#faf9f7, #f5f3ef):** Backgrounds

### Don't use color alone
Every color signal should have a non-color companion: an icon, text, or position change. The 🌱 emoji accompanies the green vegan border.

---

## Typography

- **Serif (Georgia):** Prose, book content, descriptions. Warm and readable.
- **Sans-serif (system-ui):** UI elements, buttons, labels. Crisp and functional.
- **Monospace (SF Mono, Fira Code):** Code blocks, source viewer. Technical and precise.

### Hierarchy through size and weight
- H1: 2em, normal weight (book titles)
- H2: 1.5em, normal weight (section titles)
- H3: 1em, bold (recipe names, test titles)
- Body: 0.9em, normal (descriptions, instructions)
- Small: 0.8em, lighter color (metadata, hints)

---

## The $Chemistry App Specifically

The app is a bookshelf. The visual language should feel like a well-designed reading experience:
- Warm colors, not cold corporate blue
- Serif for content, sans for chrome
- Paper-like backgrounds, not stark white
- Generous spacing — don't crowd the content
- The sidebar is a wooden bookshelf (dark warm brown)
- The content area is a reading surface (warm white)

The app demonstrates $Chemistry. Every visual choice should make the framework's patterns visible:
- The `▸` expand indicator shows there's hidden content (progressive disclosure)
- The 🌱 shows polymorphism at work (a subclass, not a prop)
- Side-by-side code shows the source behind the rendered output
- Two kitchens side by side show instance independence
