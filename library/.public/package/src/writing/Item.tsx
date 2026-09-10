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
        super.$Sentence(this.addType(block, $TypeOfItem));
    }

    override print(content: ReactNode): ReactNode {
        return <li className={this.className}>{content}</li>;
    }
}

export class $TypeOfItem extends $TypeOfSentence {
    protected override specification: Specification<$Writing> = new ItemSpecification();

    // A MARK IS BLOCK STRUCTURE, NOT COPY, and the parse owns block structure. The mark that opened
    // a line is SPENT, so no item carries one. THE WALK IS THE PARSER'S — it was copied out here
    // with one regex changed, along with the trimming and the empty-line filter it already does.
    protected marks = {
        dividing: /\n|(?:^|\s)[-*•·]\s+/u,
        opening: /^[-*•·]\s+/u
    };

    override makes(tokens: (string | $Writing)[]): $Writing[] {
        const Made = $(Item);

        // A cut made ON a newline consumes it, so the mark opening the NEXT line has nothing in
        // front of it for the split to match — it is spent here instead, per line.
        return parser.sentences(tokens, this.marks.dividing)
            .map(line => typeof line[0] === 'string' ? [line[0].replace(this.marks.opening, ''), ...line.slice(1)] : line)
            .map(line => $<$Item>(<Made />, ...line as never[]));
    }
}

export class ItemSpecification extends SentenceSpecification {
}

export const Item = $($Item);
export const TypeOfItem = $($TypeOfItem);
