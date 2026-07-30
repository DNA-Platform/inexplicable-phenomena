export interface $Writing {
    copy: string;
    index: number;
    parenthetical: boolean;
}

export interface $Composition<T extends $Writing = $Writing> extends $Writing {
    parts: T[];
    canonical: T;
}
