export interface $Reference<T = unknown> {
    copy: string;
    index: number;
    parenthetical: boolean;
    read(): T | undefined;
    valid(): boolean;
    equals(ref: $Reference<T>): boolean;
    then<U>(next: $Reference<U>): $Reference<U>;
}
