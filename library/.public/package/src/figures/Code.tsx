import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { Block as block } from '@/writing/Composition';
import { $Figure } from './Figure';
import { $Highlighted, type Piece } from './Highlighted';
import { $Numbered } from './Numbered';

const lines = (pieces: Piece[]): Piece[][] => {
    const held: Piece[][] = [[]];
    for (const piece of pieces)
        piece.text.split('\n').forEach((part, index) => {
            if (index > 0) held.push([]);
            if (part !== '') held[held.length - 1].push({ text: part, classes: piece.classes });
        });
    if (held.length > 1 && held[held.length - 1].length === 0) held.pop();
    return held;
};

const joined = (line: Piece[]): ReactNode[] => {
    const out: ReactNode[] = [];
    let plain = '';
    for (const piece of line) {
        if (piece.classes === '') { plain += piece.text; continue; }
        if (plain !== '') { out.push(plain); plain = ''; }
        out.push(<span className={piece.classes} key={out.length}>{piece.text}</span>);
    }
    out.push(`${plain}\n`);
    return out;
};

export class $Code extends $Figure {
    get listing(): string { return html.copy(this.text) + this.contents; }

    override write(): ReactNode {
        const highlighted = this.annotations.expressed($Highlighted);
        const numbered = this.annotations.expressed($Numbered);
        if (highlighted === undefined && numbered === undefined) return <pre><code>{super.write()}</code></pre>;
        const pieces = highlighted === undefined ? [{ text: this.listing, classes: '' }] : highlighted.tokens(this.listing);
        return (
            <pre><code>{lines(pieces).map((line, index) => (
                <span className="pd-line" key={index}>
                    {numbered === undefined ? null : <span className="pd-line-number">{index + 1}</span>}
                    {joined(line)}
                </span>
            ))}</code></pre>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-code');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
    }
}

export const Code = $($Code);
