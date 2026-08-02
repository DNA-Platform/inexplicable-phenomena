import { type $Reference } from '../reference/Reference';
import { type $Composition } from '../writing/Composition';
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

    static follow<T extends { copy: string; index: number; parenthetical: boolean }>(of: { contents(): $Reference<T>[] }): $Composition<T> & { follow(): $Composition<any> } {
        const found = (): T[] => of.contents().map(r => r.read()).filter((t): t is T => t !== undefined);
        const followed: $Composition<T> & { follow(): $Composition<any> } = {
            get canonical() { return found()[0]; },
            contents: found,
            where: (match) => found().filter(match),
            select: (pick) => found().map(pick),
            at(index: number) { return new $Location<T>(index, followed); },
            get copy() { return found().map(t => t.copy).join(' '); },
            index: 0,
            parenthetical: false,
            follow: () => Composible.follow({ contents: () => found().flatMap(t => ((t as { ref?: { contents?(): $Reference<any>[] } }).ref?.contents?.() ?? [])) }),
        };
        return followed;
    }
}
