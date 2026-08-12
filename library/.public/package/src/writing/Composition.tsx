import { $Referent$ } from '../reference/Referent';
import { $Location } from '../reference/Location';

// A composition holds its parts in order, and order is the only numbering there
// is: `at(n)` means the part standing at position n. Nothing carries a number —
// a number is something a REFERENCE holds, never a property of a part.
export interface $Composition$<T extends $Referent$ & { copy: string; parenthetical: boolean }> extends $Referent$ {
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    single(match: (part: T) => boolean): T;
    at(position: number): $Location<T>;
    copy: string;
    parenthetical: boolean;
}
