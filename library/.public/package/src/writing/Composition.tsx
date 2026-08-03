import { type $Location } from '../reference/Location';

export interface $Composition<T extends { copy: string; index: number; parenthetical: boolean }> {
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    at(index: number): $Location<T>;
    copy: string;
    index: number;
    parenthetical: boolean;
}
