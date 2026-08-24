import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from '../reference/Referent';
import { $Reference } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing } from '../writing/Writing';
import { $Document } from './Document';
import { $Footer } from './Footer';
import { $Footnote } from './Footnote';

export class $Denote extends $Writing implements $Reference<$Footnote> {
    // THE KEY OF A LEGEND, and a person writes it: <Footnote name="arrow">. It
    // was `$for`, which also meant a card and a reference on other classes — one
    // prop name, three types, four meanings.
    //
    // NOT `$key`, and the reason is the platform rather than the word: React
    // reserves `key` and [$apply$] skips it, so no JSX attribute could ever set
    // it. $Key — the legend's own class — already holds this string as $name.
    $name = '';

    parenthetical = true;

    get for(): string {
        return this.$name || this.copy.trim();
    }

    get document(): $Document {
        const held = this.standing($Document);
        if (!held) throw new Error(`Denote ${this.for}: it stands outside any document.`);
        return held;
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

    then<U extends $Referent>(next: $Reference<U>): $Reference<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    view(): ReactNode {
        const theme = this.theme;
        const mark = { color: theme.accent, fontSize: '0.7em', verticalAlign: 'super', lineHeight: 0, paddingLeft: '0.1em' };
        try {
            return <sup style={mark}>{this.number}</sup>;
        } catch {
            return <sup style={mark}>{this.for}</sup>;
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
