import { $Referent$ } from './Referent';
import { $Composition$ } from '../writing/Composition';
import { $Reference$ } from './Reference';

export interface $Catalogue$<T extends $Referent$ & { copy: string; index: number; parenthetical: boolean } = any> extends $Composition$<$Reference$<T>>, $Reference$<$Composition$<T>> {
    follow(): $Composition$<T>;
}
