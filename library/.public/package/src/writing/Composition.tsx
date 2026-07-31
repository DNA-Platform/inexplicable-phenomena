import { type $Writing } from './Writing';

export interface $Composition<T extends $Writing = $Writing> extends $Writing {
    parts: T[];
    canonical: T;
}
