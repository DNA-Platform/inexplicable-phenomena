import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Writing$, $Writing } from '@/writing/Writing';
import type { $Catalogue } from '@/reference/Catalogue';
import { $Type } from './Type';

export interface $Composition$ extends $Writing$ {
    parenthetical: boolean;

    parts(): $Writing[];
    catalogue(): $Catalogue | undefined;
    searchParts<T extends $Writing>(type: new() => $Type): T[];
    searchPartsForOne<T extends $Writing>(type: new() => $Type): T | undefined;
    where(match: (part: $Writing) => boolean): $Writing[];
    select<U>(pick: (part: $Writing) => U): U[];
    selectMany<U>(pick: (part: $Writing) => U[]): U[];
    single(match: (part: $Writing) => boolean): $Writing;
}

export class $Composition extends $Writing implements $Composition$ {
    // PRINT IS TRI-STATE, and that is Doug's ruling: "On the cover, print=false should make it
    // parenthetical. We cover that everyone." Unwritten, a writing is shown unless it is
    // parenthetical; written, the author decides — print turns a parenthetical writing ON and
    // print={false} turns any writing OFF. It was a boolean defaulting to false, so it could only
    // ever say yes, and a paper wanting a subject in its schema and not on its page had to make the
    // KIND parenthetical for every book that has one.

    parts(): $Writing[] {
        const kind = this.kind;
        const beneath = reflection.below(kind);
        const own = kind?.constructor as (new() => $Type) | undefined;
        return parser.parse(this,
            token => {
                // A NESTED WRITING OF THE SAME KIND IS A PART, NOT ITS PARTS. What stood here
                // answered `token.parts()` — the ONLY recursion in this reading, and the reason a
                // parse could not be asked for safely anywhere: asking a book for its parts asked
                // every document for theirs, and every section under those. It also DISSOLVED the
                // nesting an author wrote. Measured 2026-09-09: <List><List>- inner</List>- outer
                // </List> answered two items and no inner list at all, and the LaTeX paper drew
                // nine sections with NONE nested and every heading an h2, because a section written
                // inside a section was replaced by its paragraphs before anything could draw it.
                // The reading is one level now, which is what makes it safe to ask.
                if (own !== undefined && token !== this && reflection.is(token, own)) return token;
                if (beneath === undefined) return token;
                return reflection.is(token, beneath) ? token : undefined;
            },
            tokens => this.reduce(tokens),
            parts => kind?.supplies(this, parts) ?? parts);
    }

    catalogue(): $Catalogue | undefined {
        return this.mention;
    }

    $Composition(block: $Block) {
        super.$Writing(block);
    }

    // THE PARTS TWIN OF searchFor. `searchFor` asks the BLOCK by type and `where`/`select`/`single`
    // ask the PARTS by a predicate; nothing asked the parts BY TYPE, so four places wrote the same
    // predicate by hand. `searchParts` and `searchPartsForOne` are proxy names, flagged.
    searchParts<T extends $Writing>(type: new() => $Type): T[] {
        return this.parts().filter((part): part is T => reflection.is(part, type));
    }

    searchPartsForOne<T extends $Writing>(type: new() => $Type): T | undefined {
        const found = this.searchParts<T>(type);
        $check(found.length <= 1, `writing holds one of a kind among its parts, and this one holds ${found.length}`);
        return found[0];
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

    static $register(): void {
        reflection.knows({ composition: $Composition });
    }

    protected reduce(tokens: (string | $Writing)[]): $Writing[] {
        const beneath = reflection.below(this.kind);
        return beneath === undefined ? [] : reflection.template(beneath).makes(tokens);
    }
}

export const Composition = $($Composition);
