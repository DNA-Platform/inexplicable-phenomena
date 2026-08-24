import { $Referent } from './Referent';
import { $Composition } from '../writing/Composition';
import { $Reference } from './Reference';

// A CATALOGUE IS A COMPOSITION OF REFERENCES, AND NOTHING MORE. It used to
// declare read() and then() as well — both of them $Reference's members — which
// made every catalogue an obligation to stand for something. It has no reason to.
// You do not read a catalogue; you consult it, and you read its ENTRIES.
export interface $Catalogue<T extends $Referent & { copy: string; parenthetical: boolean } = any> extends $Composition<$Reference<T>> {
}
