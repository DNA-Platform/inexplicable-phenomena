import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Writing$, $Writing } from '@/writing/Writing';
import type { $Catalogue } from '@/reference/Catalogue';
import { $Type } from './Type';

// A TYPE THAT MAKES THE LEVEL BENEATH, WHICH NOT EVERY TYPE DOES. Only the levels of a composition
// make anything — a letter, a word, a sentence, a paragraph, a section, an item — and declaring it
// on $Type meant every type in the library claimed to make things, when a type types them. Doug,
// 2026-09-16: "it is now added the semantic commitment that a type makes anything when in fact it
// types things or is the typeof things." The six that do keep it; the base does not; this asks.
//
// IT IS ASKED, NOT CAST. A type that makes things is narrower than a type, so the question is a
// predicate with a real check behind it rather than an assertion that the check happened elsewhere.
interface Makes extends $Type { makes(tokens: (string | $Writing)[]): $Writing[]; }

const makes = (type: $Type): type is Makes => 'makes' in type;

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
                if (reflection.is(token, beneath)) return token;
                // A WRITING FROM A HIGHER LEVEL STANDS WHERE IT WAS WRITTEN. What a level does not
                // accept is treated as prose and MADE into the level beneath — which is right for a
                // word or a mention and wrong for a synopsis, because a synopsis is a document and a
                // document cannot be made into a paragraph. Measured 2026-09-15: every printed
                // synopsis came out as `<p class="pd-paragraph"><article class="pd-synopsis">`, the
                // parser closed the paragraph where the article opened, and the served markup was
                // not the tree the browser built — so React discarded the whole page at the first
                // press and no link on it could be clicked.
                return reflection.above(kind, token.kind) ? token : undefined;
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
        if (beneath === undefined) return [];
        const type = reflection.template(beneath);

        return makes(type) ? type.makes(tokens) : [];
    }
}

export const Composition = $($Composition);
