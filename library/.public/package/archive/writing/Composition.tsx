import { $Referent } from '../reference/Referent';
import { $Location } from '../reference/Location';

export interface $Composition<T extends $Referent & { copy: string; parenthetical: boolean }> {
    valid(): boolean;
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    selectMany<U>(pick: (part: T) => U[]): U[];
    single(match: (part: T) => boolean): T;
    at(position: number): $Location<T>;
    copy: string;
    parenthetical: boolean;
}
