import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Writing$, $Writing } from '@/writing/Writing';
import type { $Catalogue } from '@/reference/Catalogue';
import { $Type } from './Type';

export interface $Composition$ extends $Writing$ {
    parenthetical: boolean;
    $print: boolean;

    parts(): $Writing[];
    catalogue(): $Catalogue | undefined;
    where(match: (part: $Writing) => boolean): $Writing[];
    select<U>(pick: (part: $Writing) => U): U[];
    selectMany<U>(pick: (part: $Writing) => U[]): U[];
    single(match: (part: $Writing) => boolean): $Writing;
}

export class $Composition extends $Writing implements $Composition$ {
    parenthetical = false;
    $print = false;

    parts(): $Writing[] {
        const kind = this.kind;
        const beneath = kind?.below();
        const own = kind?.constructor as (new() => $Type) | undefined;
        return parser.parse(this,
            token => {
                // A NESTED WRITING OF THE SAME KIND IS A PART, NOT ITS PARTS. What stood here
                // answered `token.parts()` — the ONLY recursion in this reading, and the reason a
                // parse could not be asked for safely anywhere: asking a book for its parts asked
                // every chapter for theirs, and every section under those. It also DISSOLVED the
                // nesting an author wrote. Measured 2026-09-09: <List><List>- inner</List>- outer
                // </List> answered two items and no inner list at all, and the LaTeX paper drew
                // nine sections with NONE nested and every heading an h2, because a section written
                // inside a section was replaced by its paragraphs before anything could draw it.
                // The reading is one level now, which is what makes it safe to ask.
                if (own !== undefined && token !== this && reflection.instanceOf(token, own)) return token;
                if (beneath === undefined) return token;
                return reflection.instanceOf(token, beneath) ? token : undefined;
            },
            tokens => this.reduce(tokens),
            parts => kind?.supplies(this, parts) ?? parts);
    }

    catalogue(): $Catalogue | undefined {
        return this.mention;
    }

    // A COMPOSITION MAY WRITE ITSELF. A consumer's chapter is `export default $(<Chapter>…</Chapter>)`
    // at module scope, so importing it builds its whole tree before React exists — Doug: "we
    // shouldn't even be evaling the chapters in place. That is module load time." A subclass that
    // answers `writes()` declares the same content as a CLASS, and it is evaluated here, when the
    // chapter is constructed, which is when the book is built rather than when the module is read.
    //
    // IT IS THE BOND AND NOT THE VIEW, measured 2026-09-09: a $Chapter subclass declaring its
    // sections in view() draws two refusal panels reading "a piece of writing says something, and
    // this one says nothing at all", because a rule reads the BLOCK and a view never fills one. The
    // same content concatenated onto the block here draws clean. `writes` is a proxy name.
    // AN ARRAY AND NOT A FRAGMENT, measured: $(<>…</>) answers something that is not a piece of
    // writing, and the block then refuses with "a piece of writing holds copy, annotations and
    // writing, and this one holds something else". Each one is evaluated on its own.
    protected writes(): ReactNode[] {
        return [];
    }

    $Composition(block: $Block) {
        const own = this.writes();
        super.$Writing(own.length === 0 ? block
            : $check(block, $Block, '!').concat(...own.map(one => $(one as never)) as never[]));
    }

    override view(): ReactNode {
        return this.parenthetical && !this.$print ? null : super.view();
    }

    where(match: (part: $Writing) => boolean): $Writing[] { return this.parts().filter(match); }
    select<U>(pick: (part: $Writing) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: $Writing) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: $Writing) => boolean): $Writing {
        const matches = this.parts().filter(match);
        $check(matches.length === 1, `single expected exactly one part and found ${matches.length}`);
        return matches[0];
    }

    concatenate(...more: $Composition[]): $Composition {
        const Made = $(Composition);

        return $<$Composition>(<Made />, ...this.parts(), ...more.flatMap(part => part.parts()));
    }

    protected reduce(tokens: (string | $Writing)[]): $Writing[] {
        const beneath = this.kind?.below();
        return beneath === undefined ? [] : reflection.template(beneath).makes(tokens);
    }
}

export const Composition = $($Composition);
