// styled-components theme. The design tokens become the runtime theme that
// every styled component reads via `(p) => p.theme.brand` etc. Cathy's first
// pass at the styled-components migration; full migration (per Phillip's
// proposal) will move every apparatus chemical's styling here.

import 'styled-components';
import { tokens, fonts, type, sizes } from './tokens';

export const theme = {
    color: tokens,
    font: fonts,
    type,
    size: sizes,
} as const;

export type Theme = typeof theme;

// Tell styled-components what the theme shape is.
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
