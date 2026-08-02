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
    const a = x as { index?: number; catalogue?: unknown };
    const b = y as { index?: number; catalogue?: unknown };
    if (a.catalogue === undefined || b.catalogue === undefined) return false;
    return a.index === b.index && same(a.catalogue, b.catalogue);
};
