export interface $Composition<T extends { copy: string; index: number; parenthetical: boolean }> {
    parts: T[];
    canonical: T;
    select(key: number): T | undefined;
    copy: string;
    index: number;
    parenthetical: boolean;
}
