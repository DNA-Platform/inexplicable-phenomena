import { type $Reference } from '../reference/Reference';
import { $Location } from '../reference/Location';
import { $Path } from '../reference/Path';

export const from = (reference: $Reference<any>): unknown =>
    reference instanceof $Path ? from(reference.first)
        : reference instanceof $Location ? reference.of
            : undefined;

export const last = (reference: $Reference<any>): { i: number; of?: unknown } | undefined =>
    reference instanceof $Path ? last(reference.next)
        : reference instanceof $Location ? { i: reference.i, of: reference.of }
            : undefined;

export const same = (x?: unknown, y?: unknown): boolean => {
    if (!x || !y) return false;
    if (x === y) return true;
    const a = (x as { location?: $Reference }).location;
    const b = (y as { location?: $Reference }).location;
    if (!a || !b) return false;
    const here = last(a);
    const there = last(b);
    if (!here || !there) return false;
    return here.i === there.i && same(here.of, there.of);
};
