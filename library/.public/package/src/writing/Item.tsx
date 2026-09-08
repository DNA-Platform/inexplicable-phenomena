// CREATED 2026-09-09 · rating 4. AN ITEM IS A TYPE OF SENTENCE — Doug's ruling: "Make an item a
// type of sentence, and when that's there, it has the semantic form", and "if the list has a type
// of item, it renders itself as a list". A list stands at paragraph level, so what it makes is one
// level down, and the <li> belongs to the item rather than to something the list builds out of its
// own copy. THE SPLITTING RULE IS UNCHANGED — a mark or a newline opens an item, which is what
// $List.print() used to do with a regex; what changed is that the pieces are WRITINGS now, made
// where the framework makes everything else, so a sheet can select one and a subclass can be one.
import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { parser } from '@/utilities/Parser';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Sentence$, $Sentence, $TypeOfSentence, SentenceSpecification } from '@/writing/Sentence';

export interface $Item$ extends $Sentence$ { }

export class $Item extends $Sentence implements $Item$ {
    $Item(block: $Block) {
        super.$Sentence($check(block, $Block, '!').concat($check($TypeOfItem, '!')));
    }

    override print(content: ReactNode): ReactNode {
        return <li className={this.className}>{content}</li>;
    }
}

export class $TypeOfItem extends $TypeOfSentence {
    override name = 'Item';
    protected override specification: Specification<$Writing> = new ItemSpecification();

    // A MARK IS BLOCK STRUCTURE, NOT COPY, and the parse owns block structure. The mark that opened
    // a line is SPENT here, so no item carries one and nothing downstream has to strip it.
    protected marks = {
        dividing: /\n|(?:^|\s)[-*•·]\s+/u,
        leading: /^\s+/u,
        trailing: /\s+$/u
    };

    // WRITTEN ELEMENTS SURVIVE THE CUT. A citation or a reference inside a list belongs to the item
    // it was written into, so the walk carries non-string tokens through rather than reading the
    // copy out with html.text — which is what made the old splitter blind to them.
    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Item);
        const lines: (string | $Writing)[][] = [[]];

        for (const token of tokens) {
            if (typeof token !== 'string') { lines[lines.length - 1].push(token); continue; }
            token.split(this.marks.dividing).forEach((piece, at) => {
                if (at > 0) lines.push([]);
                if (piece !== '') lines[lines.length - 1].push(piece);
            });
        }

        return lines
            .map(line => this.trimmed(line))
            .filter(line => line.some(part => typeof part !== 'string' || part !== ''))
            .map(line => reflection.carrying<$Item>(Made, line));
    }

    protected trimmed(line: (string | $Writing)[]): (string | $Writing)[] {
        const cut = [...line];
        const first = cut[0];
        if (typeof first === 'string') cut[0] = first.replace(this.marks.leading, '');
        const last = cut[cut.length - 1];
        if (typeof last === 'string') cut[cut.length - 1] = last.replace(this.marks.trailing, '');

        return cut.filter(part => part !== '');
    }
}

export class ItemSpecification extends SentenceSpecification {
}

export const Item = $($Item);
export const TypeOfItem = $($TypeOfItem);
