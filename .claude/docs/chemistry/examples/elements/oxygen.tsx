// $Oxygen — the reactive element
//
// Demonstrates: element identity.
//
// Concept: Oxygen is atomic number 8. Highly reactive — it bonds
// with almost everything. In $Chemistry, it participates in
// compounds like $Water (H₂O).

import { $Element } from './element';

export class $Oxygen extends $Element {
    number = 8;
    symbol = 'O';
    name = 'Oxygen';
    mass = 15.999;
}

export const Oxygen = new $Oxygen().Component;
