import { type $Referent$ } from '../reference/Referent';
import { type $Location } from '../reference/Location';

export interface $Composition$<T extends $Referent$ & { copy: string; index: number; parenthetical: boolean }> extends $Referent$ {
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    single(match: (part: T) => boolean): T;
    at(index: number): $Location<T>;
    copy: string;
    index: number;
    parenthetical: boolean;
}
