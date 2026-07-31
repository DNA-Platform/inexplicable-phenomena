export interface $Composition<T extends { copy: string; index: number; parenthetical: boolean }> {
    parts: T[];
    canonical: T;
    copy: string;
    index: number;
    parenthetical: boolean;
}
