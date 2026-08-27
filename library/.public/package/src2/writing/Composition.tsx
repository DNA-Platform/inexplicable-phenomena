import { $Writing } from './Writing';

export interface $Composition$<T extends $Writing> {
    parts(): T[];
    canonical: T;
}
