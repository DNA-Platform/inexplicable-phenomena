import { $Writing } from './Writing';

export interface $Composition$<T extends $Writing> {
    parts(): T[];
    canonical(): T;
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    selectMany<U>(pick: (part: T) => U[]): U[];
    single(match: (part: T) => boolean): T;
}
