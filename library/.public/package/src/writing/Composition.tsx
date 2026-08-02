import { type $Location } from '../reference/Location';

export type $Part = { copy: string; index: number; parenthetical: boolean };

export interface $Composition<T extends $Part> {
    canonical: T;
    contents(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    at(index: number): $Location<T>;
    copy: string;
    index: number;
    parenthetical: boolean;
}
