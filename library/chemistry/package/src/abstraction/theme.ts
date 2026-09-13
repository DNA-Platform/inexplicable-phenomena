import { ReactNode } from 'react';
import { $Chemical } from './chemical';
import { children, theme } from '../implementation/symbols';

// A THEME IS A CHEMICAL THAT PROVIDES ITSELF: its fields are the values, and
// what it holds is drawn in them. Subclass it with the values; write a field
// and the styled beneath follow. A chemical that would rather be its own theme
// answers theme the same way, and adds no element.
export class $Theme extends $Chemical {
    override get [theme](): this { return this; }
    view(): ReactNode { return this[children]; }
}
