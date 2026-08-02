import { type $Composition } from '../writing/Composition';
import { type $Reference } from './Reference';

export interface $Catalogue<T extends { copy: string; index: number; parenthetical: boolean } = any> extends $Composition<$Reference<T>>, $Reference<$Composition<T>> {
}
