export interface $Composition<T extends { copy: string; index: number; parenthetical: boolean }> {
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    single(match?: (part: T) => boolean): T | undefined;
    copy: string;
    index: number;
    parenthetical: boolean;
}
