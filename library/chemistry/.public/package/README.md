# @dna-platform/chemistry

A reactive component framework for React in which a component is a class — a chemical — whose fields are its state, whose `view()` draws it, and whose CSS-named fields are its stylesheet.

```tsx
import { $, $Chemical, $Theme, children, styled, theme } from '@dna-platform/chemistry';

class $Palette extends $Theme {            // a theme is a chemical that provides itself
    paper = '#f8f9fa';
    ink = '#202122';
}

class $Card extends $Chemical {            // a styled chemical reads what was provided above it
    selector = styled.article;
    get background() { return this[theme].paper; }
    get color() { return this[theme].ink; }
    padding = '10px 14px';
    view() { return <article>{this[children]}</article>; }
}

const Palette = $($Palette);
const Card = $($Card);

<Palette><Card>drawn in the palette</Card></Palette>
```

Writing a field on a chemical repaints what reads it; writing a field on a theme repaints the styled chemicals beneath it. `$(A, B)(C)` registers, for everything drawn under `A`, that an ask for `B` is answered by `C`. A page rendered with `renderToString` hydrates with `hydrateRoot`.

React, React DOM and styled-components are peer dependencies. The framework's library — its design, every feature with its promises, and the record of how it came to be — lives in the repository beside the code.

MIT.
