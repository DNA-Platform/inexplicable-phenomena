import { type $Composition } from '../writing/Composition';
import { type Following } from '../utilities/Composible';
import { type $Reference } from './Reference';

export interface $Catalogue<T extends { copy: string; index: number; parenthetical: boolean } = any> extends $Composition<$Reference<T>>, $Reference<$Composition<T>> {
    follow(): Following<T>;
}
