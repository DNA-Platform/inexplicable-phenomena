// $Carbon — the basis of organic chemistry
//
// Demonstrates: element identity with distinct properties.
//
// Concept: Carbon is atomic number 6. The basis of organic
// chemistry — it forms more compounds than any other element.
// In $Chemistry, it appears in organic compounds like $Methane.

import { $Element } from './element';

export class $Carbon extends $Element {
    number = 6;
    symbol = 'C';
    name = 'Carbon';
    mass = 12.011;
}

export const Carbon = new $Carbon().Component;
