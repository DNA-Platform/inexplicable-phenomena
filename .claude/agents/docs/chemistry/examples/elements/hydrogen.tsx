// $Hydrogen — the simplest element
//
// Demonstrates: subclassing $Element, intrinsic defaults,
// the Component membrane ($ disappears at the export).
//
// Concept: Hydrogen is atomic number 1. The simplest thing
// that can exist independently. In $Chemistry, the simplest
// chemical that can render.

import { $ } from '@dna-platform/chemistry';
import { $Element } from './element';

class $Hydrogen extends $Element {
    number = 1;
    symbol = 'H';
    name = 'Hydrogen';
    mass = 1.008;
}

export const Hydrogen = $($Hydrogen);
