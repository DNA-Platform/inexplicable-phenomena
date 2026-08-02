import { $Location } from './Location';
import { $Path } from './Path';

export interface $Reference<T = unknown> {
    copy: string;
    index: number;
    parenthetical: boolean;
    find(): T | undefined;
    valid(): boolean;
    equals(ref: $Reference<T>): boolean;
    then<U>(next: $Reference<U>): $Reference<U>;
}

export const home = (reference: $Reference<any>): unknown =>
    reference instanceof $Path ? home(reference.first)
        : (reference as { of?: unknown }).of;

export const last = (reference: $Reference<any>): { i: number; place?: unknown } | undefined =>
    reference instanceof $Path ? last(reference.next)
        : reference instanceof $Location ? { i: reference.i, place: reference.of }
            : undefined;

export const same = (x?: unknown, y?: unknown): boolean => {
    if (!x || !y) return false;
    if (x === y) return true;
    const a = (x as { place?: $Reference }).place;
    const b = (y as { place?: $Reference }).place;
    if (!a || !b) return false;
    const from = last(a);
    const to = last(b);
    if (!from || !to) return false;
    return from.i === to.i && same(from.place, to.place);
};
