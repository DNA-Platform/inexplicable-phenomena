import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Referent } from '../reference/Referent';
import { type $Reference } from '../reference/Reference';
import { $Path } from '../reference/Path';
import { $Writing } from '../writing/Writing';
import { $Document } from './Document';
import { $Footer } from './Footer';
import { $Footnote } from './Footnote';

export class $Denote extends $Writing implements $Reference<$Footnote> {
    get key(): string {
        return this.copy.trim();
    }

    protected get above(): $Document | undefined {
        let scope: unknown = this.parent;
        while (scope && !(scope instanceof $Document)) {
            const parent = (scope as { parent?: unknown }).parent;
            scope = parent === scope ? undefined : parent;
        }
        return scope as $Document | undefined;
    }

    get document(): $Document {
        const found = this.above;
        if (!found) throw new Error(`Denote ${this.key}: it stands outside any document.`);
        return found;
    }

    get footer(): $Footer {
        const found = this.document.footer;
        if (!found) throw new Error(`Denote ${this.key}: the document has no footer.`);
        return found;
    }

    get footnote(): $Footnote {
        const found = this.footer.legend.keys.filter(k => k.name === this.key);
        if (found.length !== 1) throw new Error(`Denote ${this.key}: ${found.length} entries carry this key.`);
        return found[0].read();
    }

    get number(): number {
        return this.footnote.index;
    }

    read(): $Footnote {
        return this.footnote;
    }

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Footnote, U>(this, next);
    }

    view(): ReactNode {
        try {
            return <sup className="mark">{this.number}</sup>;
        } catch {
            return <sup className="mark">{this.key}</sup>;
        }
    }

    valid(): boolean {
        if (!this.above) return false;
        return this.footnote.valid();
    }
}

export const Denote = $($Denote);
