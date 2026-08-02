import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { type $Reference, same } from '../reference/Reference';
import { type $Catalogue } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { Composible } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { $Writing } from './Writing';
import { $Letter } from './Letter';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Writing implements $Composition<$Sentence> {
    get canonical(): $Sentence { return Composible.canonical(this); }
    get sentences(): $Sentence[] { return this.contents(); }

    get ref(): $$Paragraph { return new $$Paragraph(this); }

    get words(): $Word[] { return this.sentences.flatMap(s => s.words); }
    get letters(): $Letter[] { return this.words.flatMap(w => w.letters); }

    at(index: number): $Location<$Sentence> {
        return Composible.at(this, index);
    }

    where(match: (part: $Sentence) => boolean): $Sentence[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (part: $Sentence) => U): U[] {
        return Composible.select(this, pick);
    }

    contents(): $Sentence[] {
        const sentences: $Sentence[] = (this.copy.match(/\s*[^.!?]+[.!?]*/g) ?? []).map(s => $(<Sentence>{s.trim()}</Sentence>));
        return sentences.filter(s => s.valid()).map((s, i) => {
            s.index = i + 1;
            s.place = this.at(s.index);
            return s;
        });
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export class $$Paragraph implements $Catalogue<$Sentence>, $Reference<$Paragraph> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Paragraph) { }

    get copy(): string { return this.contents().map(r => r.copy).join(' '); }
    get canonical(): $Reference<$Sentence> { return Composible.canonical(this); }
    get words(): $Reference<$Word>[] { return Composible.down(this.contents(), s => s.ref); }
    get letters(): $Reference<$Letter>[] { return Composible.down(this.words, w => w.ref); }

    contents(): $Reference<$Sentence>[] {
        return this.of.contents().map((sentence, slot) => {
            const reference = this.of.at(sentence.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference<$Sentence>) => boolean): $Reference<$Sentence>[] {
        return Composible.where(this, match);
    }

    select<U>(pick: (reference: $Reference<$Sentence>) => U): U[] {
        return Composible.select(this, pick);
    }

    at(index: number): $Location<$Reference<$Sentence>> {
        return Composible.at(this, index);
    }

    find(): $Paragraph {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    equals(ref: $Reference<$Paragraph>): boolean {
        const found = ref.find();
        return this.of === found || same(this.of, found);
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Paragraph, U>(this, next);
    }
}

export const Paragraph = $($Paragraph);
