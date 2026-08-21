import { $Referent } from './Referent';
import { $Composition$ } from '../writing/Composition';
import { $Reference$ } from './Reference';

export interface $Catalogue$<T extends $Referent & { copy: string; parenthetical: boolean } = any> extends $Composition$<$Reference$<T>> {
    read(): $Composition$<T>;
    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U>;
    follow(): $Composition$<T>;
}
