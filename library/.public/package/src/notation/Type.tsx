import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition$ } from '@/writing/Composition';
import { $$ } from '@/utilities/Lib';
import { $Annotation } from './Annotation';

export class $Type<T extends $Writing = $Writing> extends $Annotation implements $Composition$<T> {
    instance?: $Writing = undefined;

    override get formula(): boolean { return true; }

    override get copy(): string { return this.instance ? this.instance.copy : ''; }

    bind(writing: $Writing): this {
        this.instance = writing;
        return this;
    }

    // A TYPE'S OWN WRITING IS ITS NAME, never its content. An unbound type draws
    // nothing, which is what keeps the word out of the prose and stops the
    // recursion the formula would otherwise open.
    override view(): ReactNode {
        if (!this.instance) return null;
        const Instance = $(this.instance);
        return <Instance />;
    }

    parts(): T[] {
        return [];
    }

    // NAMING IS OWED. The walk a level runs when its parts are WRITTEN rather
    // than found: the written pieces that carry the type it composes, each
    // bound to the piece it stands for.
    protected composed<P extends $Type>(type: new () => P): P[] {
        if (!this.instance) return [];
        return this.instance.written()
            .filter((one): one is $Writing => one instanceof $Writing)
            .filter(one => $Type.is(one, type))
            .map(one => $$(type, one));
    }

    canonical(): T {
        return this.parts()[0];
    }

    where(match: (part: T) => boolean): T[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: T) => U): U[] {
        return this.parts().map(pick);
    }

    selectMany<U>(pick: (part: T) => U[]): U[] {
        return this.parts().flatMap(pick);
    }

    single(match: (part: T) => boolean): T {
        const found = this.parts().filter(match);
        // AN EXPLICIT THROW, because $check RECORDS its reason and returns it —
        // outside a bond constructor nothing hears it, and single has to refuse.
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    static is(writing: $Writing, type: new () => $Type): boolean {
        return writing.specification.some(one => one instanceof type);
    }
}
