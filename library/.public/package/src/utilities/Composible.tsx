import { type $Reference } from '../reference/Reference';
import { $Location } from '../reference/Location';

export class Composible {
    static canonical<T>(of: { contents(): T[] }): T {
        return of.contents()[0];
    }

    static where<T>(of: { contents(): T[] }, match: (part: T) => boolean): T[] {
        return of.contents().filter(match);
    }

    static select<T, U>(of: { contents(): T[] }, pick: (part: T) => U): U[] {
        return of.contents().map(pick);
    }

    static at<T>(of: { contents(): T[] }, index: number): $Location<T> {
        return new $Location<T>(index, of as any);
    }

    static extend<M, T>(refs: $Reference<M>[], open: (mid: M) => { contents(): $Reference<T>[] }): $Reference<T>[] {
        return refs.flatMap(r => {
            const mid = r.find();
            return mid === undefined ? [] : open(mid).contents().map(inner => r.then(inner));
        });
    }
}
