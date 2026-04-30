// $Helium — a noble gas
//
// Demonstrates: element identity, template per type.
//
// Concept: Helium is atomic number 2. Each element type gets
// its own template. $Hydrogen and $Helium are distinct types
// with distinct templates, even though both extend $Element.

import { $ } from '@dna-platform/chemistry';
import { $Element } from './element';

class $Helium extends $Element {
    number = 2;
    symbol = 'He';
    name = 'Helium';
    mass = 4.003;
}

export const Helium = $($Helium);
