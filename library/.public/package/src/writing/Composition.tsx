import { $Block, $, $check } from '@dna-platform/chemistry';
import { $Type, $Writing } from './Writing';
import { $$ } from '@/utilities/Lib';
import { parser } from '@/utilities/Parser';
import { $Catalogue, Catalogue } from '@/reference/Catalogue';

export interface $Composition$<T extends $Writing> {
    get index(): number;
    parts(): T[];
    catalogue(): $Catalogue<T extends $Composition$<infer U extends $Writing> ? U : $Writing>;
    where(match: (part: T) => boolean): T[];
    select<U>(pick: (part: T) => U): U[];
    selectMany<U>(pick: (part: T) => U[]): U[];
    single(match: (part: T) => boolean): T;
}

export class $Composition<T extends $Writing = $Writing> extends $Writing implements $Composition$<T> {
    index = 0;

    parts(): T[] {
        const from = this.bound ? this.inside! : this;
        const worn = this.bound ? this.inside!.type : undefined;
        const type = worn?.writtenAs !== undefined ? worn : this.type;
        const writtenAs = (type?.writtenAs ?? $Writing) as new () => T;
        const kind = type?.nests ? type.canonicalForm as unknown as new () => $Composition<T> : undefined;
        const former = this.former(from, type);
        return parser.parse(from,
            token => {
                if (token !== from && token.type?.seated) return this.seat(token, writtenAs);
                if (kind !== undefined && token !== from && $$(token)(kind)) return $$(token, kind).parts();
                return $$(token)(writtenAs) ? token as unknown as T : undefined;
            },
            held => former.reduce(held),
            this.constructor !== $Composition);
    }

    catalogue(): $Catalogue<T extends $Composition$<infer U extends $Writing> ? U : $Writing> {
        return $(<Catalogue />, ...this.parts()) as never;
    }

    $Composition(block: $Block) {
        super.$Writing(block);
    }

    where(match: (part: T) => boolean): T[] { return this.parts().filter(match); }
    select<U>(pick: (part: T) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: T) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: T) => boolean): T {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    concatenate(...more: $Composition$<T>[]): $Composition<T> {
        return $<$Composition<T>>(<Composition />, ...this.parts(), ...more.flatMap(one => one.parts()));
    }

    protected seat(token: $Writing, writtenAs: new () => T): T {
        const Down = $(writtenAs);
        const made = $<T>(<Down />);
        made.bind(token);
        return made;
    }

    protected former(from: $Writing, type?: $Type): $Composition<T> {
        if (from instanceof $Composition && Object.prototype.hasOwnProperty.call(from.constructor.prototype, 'reduce')) return from as $Composition<T>;
        const shape = type?.shell;
        if (shape === undefined || !(shape.prototype instanceof $Composition)) return this;
        if (from instanceof shape && from instanceof $Composition) return from as $Composition<T>;
        if (this instanceof shape) return this;
        const Shape = $(shape);
        return $<$Composition<T>>(<Shape />);
    }

    protected reduce(held: (string | $Writing)[]): T[] {
        return [];
    }
}

export const Composition = $($Composition);
