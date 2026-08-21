import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Location } from '../reference/Location';
import * as locations from '../reference/Location';

export interface $Composition$<T extends $Referent & { copy: string; parenthetical: boolean }> {
    valid(): boolean;
    canonical: T;
    parts(): T[];
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    selectMany<U>(pick: (part: T) => U[]): U[];
    single(match: (part: T) => boolean): T;
    at(position: number): $Location<T>;
    copy: string;
    parenthetical: boolean;
}

export class $Composible$ {
    static canonical<T>(of: { parts(): T[] }): T {
        return of.parts()[0];
    }

    static where<T>(of: { parts(): T[] }, match: (part: T) => boolean): T[] {
        return of.parts().filter(match);
    }

    static select<T, U>(of: { parts(): T[] }, pick: (part: T) => U): U[] {
        return of.parts().map(pick);
    }

    static selectMany<T, U>(of: { parts(): T[] }, pick: (part: T) => U[]): U[] {
        return of.parts().flatMap(pick);
    }

    static single<T>(of: { parts(): T[] }, match: (part: T) => boolean): T {
        const found = of.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    static at<T extends $Referent>(of: { parts(): T[] }, position: number): $Location<T> {
        const Location = $(locations.Location);
        const location: $Location<T> = $(<Location i={position} of={of as any} />);
        return location;
    }

    static follow<T extends $Referent & { copy: string; parenthetical: boolean }>(of: { parts(): $Reference$<T>[] }): $Composition$<T> {
        const found = (): T[] => of.parts().map(r => r.read());
        const followed: $Composition$<T> = {
            get canonical() { return found()[0]; },
            parts: found,
            where: (match) => found().filter(match),
            select: (pick) => found().map(pick),
            selectMany: (pick) => found().flatMap(pick),
            single: (match) => {
                const kept = found().filter(match);
                if (kept.length !== 1) throw new Error(`single expected exactly one part and found ${kept.length}.`);
                return kept[0];
            },
            at(position: number) { return $Composible$.at(followed, position); },
            get copy() { return found().map(t => t.copy).join(' '); },
            valid: () => true,
            parenthetical: false,
        };
        return followed;
    }
}
