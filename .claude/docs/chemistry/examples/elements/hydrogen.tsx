// $Hydrogen — the simplest element
//
// Demonstrates: subclassing $Element, intrinsic defaults,
// the Component membrane ($ disappears at the export).
//
// Concept: Hydrogen is atomic number 1. The simplest thing
// that can exist independently. In $Chemistry, the simplest
// chemical that can render.

import { $Element } from './element';

export class $Hydrogen extends $Element {
    number = 1;
    symbol = 'H';
    name = 'Hydrogen';
    mass = 1.008;
}

export const Hydrogen = new $Hydrogen().Component;
