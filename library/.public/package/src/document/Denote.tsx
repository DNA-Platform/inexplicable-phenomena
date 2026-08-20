import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing } from '../writing/Writing';
import { $Document } from './Document';
import { $Footer } from './Footer';
import { $Footnote } from './Footnote';

export class $Denote extends $Writing implements $Reference$<$Footnote> {
    $for = '';

    $parenthetical? = true;

    get for(): string {
        return this.$for || this.copy.trim();
    }

    get document(): $Document {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof $Document)) {
            const parent = (scope as { parent?: unknown }).parent;
            scope = parent === scope ? undefined : parent;
        }
        if (!scope) throw new Error(`Denote ${this.for}: it stands outside any document.`);
        return scope as $Document;
    }

    get footer(): $Footer {
        const found = this.document.footer;
        if (!found) throw new Error(`Denote ${this.for}: the document has no footer.`);
        return found;
    }

    get footnote(): $Footnote {
        const found = this.footer.legend.keys.filter(k => k.$name === this.for);
        if (found.length !== 1) throw new Error(`Denote ${this.for}: ${found.length} notes carry this key.`);
        return found[0].read();
    }

    get number(): number {
        return this.footnote.number;
    }

    read(): $Footnote {
        return this.footnote;
    }

    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    view(): ReactNode {
        try {
            return <sup>{this.number}</sup>;
        } catch {
            return <sup>{this.for}</sup>;
        }
    }

    valid(): boolean {
        try {
            return this.footnote.valid();
        } catch {
            return false;
        }
    }
}

export const Denote = $($Denote);
