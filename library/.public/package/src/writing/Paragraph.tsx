import React from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Referent$ } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import { $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Writing, Level } from './Writing';
import { $Letter } from './Letter';
import { $Sentence } from './Sentence';
import * as sentences from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Writing<$Sentence> implements $Composition$<$Sentence> {
    get level(): Level { return 'paragraph'; }

    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get ref(): $$Paragraph { return new $$Paragraph(this); }

    // A paragraph is divided at its stops — and a stop inside a code span or
    // inside a link's target is not the end of a sentence, so "call `x.y()`
    // now." is one sentence and not three.
    divide(prose: string): string[] {
        const holds: string[] = [];
        const held = prose
            .replace(/`[^`\n]+`/g, m => ` ${holds.push(m) - 1} `)
            .replace(/\([^)\s]*\)/g, m => ` ${holds.push(m) - 1} `);
        const restore = (s: string) => s.replace(/ (\d+) /g, (_, i) => holds[Number(i)]);
        return (held.match(/\s*[^.!?]+[.!?]*/g) ?? []).map(s => restore(s.trim()));
    }

    compose(prose: string): $Sentence {
        const Sentence = $(sentences.Sentence);
        return $(<Sentence>{prose}</Sentence>);
    }

    $mark? = '';

    get mark(): string { return this.$mark ?? ''; }

    valid(): boolean {
        const base = super.valid();
        const said = $valid(/[\p{L}\p{N}]/u.test(this.copy), 'a paragraph has at least one letter or number, and this one has none');
        return base && said;
    }
}

export class $$Paragraph implements $Catalogue$<$Sentence>, $Reference$<$Paragraph> {
    parenthetical = false;

    constructor(public of: $Paragraph) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Sentence> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Sentence>[] {
        return this.of.parts().map((_, position) => this.of.at(position));
    }

    where(match: (reference: $Reference$<$Sentence>) => boolean): $Reference$<$Sentence>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Sentence>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Sentence>) => boolean): $Reference$<$Sentence> {
        return $Composible$.single(this, match);
    }

    at(position: number): $Location<$Reference$<$Sentence>> {
        return $Composible$.at(this, position);
    }

    follow(): $Composition$<$Sentence> {
        return $Composible$.follow(this);
    }

    read(): $Paragraph {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Paragraph, U> = $(<Path first={this} onward={next} />);
        return path;
    }
}

export const Paragraph = $($Paragraph);
