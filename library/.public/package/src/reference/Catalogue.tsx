import { $Referent } from './Referent';
import { $Composition$ } from '../writing/Composition';
import { $Reference$ } from './Reference';

// THE CATALOGUE EQUATION: a composition of references that is also a reference
// for the composition of what they point at.
//
// The second half is spelled out rather than inherited from $Reference$, because
// $Referent is a chemical and the composition a catalogue reads to is a READING —
// what `follow()` builds out of dereferenced entries. Everything else here still
// holds: a catalogue reads, a catalogue continues onto another reference.
export interface $Catalogue$<T extends $Referent & { copy: string; parenthetical: boolean } = any> extends $Composition$<$Reference$<T>> {
    read(): $Composition$<T>;
    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U>;
    follow(): $Composition$<T>;
}
