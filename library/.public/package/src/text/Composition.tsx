export interface $Writing {
    copy: string;
}

export interface $Composition<T extends $Writing = $Writing> extends $Writing {
    parts: T[];
    canonical: T;
}
