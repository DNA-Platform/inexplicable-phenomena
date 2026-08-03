import { type $Reference } from '../reference/Reference';
import { type $Composition } from '../writing/Composition';
import { $Location } from '../reference/Location';

export class Composible {
    static canonical<T>(of: { parts(): T[] }): T {
        return of.parts()[0];
    }

    static where<T>(of: { parts(): T[] }, match: (part: T) => boolean): T[] {
        return of.parts().filter(match);
    }

    static select<T, U>(of: { parts(): T[] }, pick: (part: T) => U): U[] {
        return of.parts().map(pick);
    }

    static at<T>(of: { parts(): T[] }, index: number): $Location<T> {
        return new $Location<T>(index, of as any);
    }

    static follow<T extends { copy: string; index: number; parenthetical: boolean }>(of: { parts(): $Reference<T>[] }): $Composition<T> {
        const found = (): T[] => of.parts().map(r => r.read()).filter((t): t is T => t !== undefined);
        const followed: $Composition<T> = {
            get canonical() { return found()[0]; },
            parts: found,
            where: (match) => found().filter(match),
            select: (pick) => found().map(pick),
            at(index: number) { return new $Location<T>(index, followed); },
            get copy() { return found().map(t => t.copy).join(' '); },
            index: 0,
            parenthetical: false,
        };
        return followed;
    }
}
