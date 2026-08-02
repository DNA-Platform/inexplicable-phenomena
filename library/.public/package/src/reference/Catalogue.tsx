import { type $Composition, type $Part } from '../writing/Composition';
import { type $Reference } from './Reference';

export interface $Catalogue<T extends $Part = any> extends $Composition<$Reference<T>>, $Reference<$Composition<T>> {
}
