import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition$ } from './Composition';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { $Writing, type Level } from './Writing';
import { $Letter } from './Letter';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Writing<$Sentence> implements $Composition$<$Sentence> {
    get level(): Level { return 'paragraph'; }

    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    get ref(): $$Paragraph { return new $$Paragraph(this); }

    // A paragraph is divided at its stops.
    divide(prose: string): string[] {
        return (prose.match(/\s*[^.!?]+[.!?]*/g) ?? []).map(s => s.trim());
    }

    compose(prose: string): $Sentence {
        return $(<Sentence>{prose}</Sentence>);
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Paragraph implements $Catalogue$<$Sentence>, $Reference$<$Paragraph> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Paragraph) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Sentence> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Sentence>[] {
        return this.of.parts().map((sentence, slot) => {
            const reference = this.of.at(sentence.index);
            reference.index = slot + 1;
            return reference;
        });
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

    at(index: number): $Location<$Reference$<$Sentence>> {
        return $Composible$.at(this, index);
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
