import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Composition } from './Composition';
import { $Writing } from './Writing';
import { $Sentence, Sentence } from './Sentence';
import { $Word } from './Word';

export class $Paragraph extends $Writing implements $Composition<$Sentence> {
    get canonical(): $Sentence { return this.parts()[0]; }
    get sentences(): $Sentence[] { return this.parts(); }
    get words(): $Word[] { return this.parts().flatMap(s => s.words); }

    where(match: (part: $Sentence) => boolean): $Sentence[] {
        return this.parts().filter(match);
    }

    select<U>(pick: (part: $Sentence) => U): U[] {
        return this.parts().map(pick);
    }

    single(match?: (part: $Sentence) => boolean): $Sentence | undefined {
        const found = match ? this.parts().filter(match) : this.parts();
        return found.length === 1 ? found[0] : undefined;
    }

    parts(): $Sentence[] {
        const sentences: $Sentence[] = (this.copy.match(/\s*[^.!?]+[.!?]*/g) ?? []).map(s => $(<Sentence>{s.trim()}</Sentence>));
        return sentences.filter(s => s.valid()).map((s, i) => {
            s.index = i + 1;
            if (this.ref) s.ref = this.ref.compose(s.index);
            return s;
        });
    }

    valid(): boolean {
        return super.valid() && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Paragraph = $($Paragraph);
