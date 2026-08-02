import { type $Reference } from '../reference/Reference';
import { $Location } from '../reference/Location';
import { $Path } from '../reference/Path';

export const from = (reference: $Reference<any>): unknown =>
    reference instanceof $Path ? from(reference.first)
        : reference instanceof $Location ? reference.of
            : undefined;

export const same = (x?: unknown, y?: unknown): boolean => {
    if (!x || !y) return false;
    if (x === y) return true;
    let a = (x as { location?: $Reference }).location;
    let b = (y as { location?: $Reference }).location;
    if (!a || !b) return false;
    while (a instanceof $Path) a = a.next;
    while (b instanceof $Path) b = b.next;
    if (!(a instanceof $Location) || !(b instanceof $Location)) return false;
    return a.i === b.i && same(a.of, b.of);
};
