import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Composition$ } from '../writing/Composition';
import { $Location, Location } from '../reference/Location';

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

    static single<T>(of: { parts(): T[] }, match: (part: T) => boolean): T {
        const found = of.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    static at<T extends $Referent$>(of: { parts(): T[] }, index: number): $Location<T> {
        const location: $Location<T> = $(<Location i={index} of={of as any} />);
        return location;
    }

    static follow<T extends $Referent$ & { copy: string; index: number; parenthetical: boolean }>(of: { parts(): $Reference$<T>[] }): $Composition$<T> {
        const found = (): T[] => of.parts().map(r => r.read());
        const followed: $Composition$<T> = {
            get canonical() { return found()[0]; },
            parts: found,
            where: (match) => found().filter(match),
            select: (pick) => found().map(pick),
            single: (match) => {
                const kept = found().filter(match);
                if (kept.length !== 1) throw new Error(`single expected exactly one part and found ${kept.length}.`);
                return kept[0];
            },
            at(index: number) { return $Composible$.at(followed, index); },
            get copy() { return found().map(t => t.copy).join(' '); },
            valid: () => true,
            index: 0,
            parenthetical: false,
        };
        return followed;
    }
}
