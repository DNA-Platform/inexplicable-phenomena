import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from '@/writing/Paragraph';
import { $Fold, Fold as fold } from './Fold';

export interface $Entry$ extends $Paragraph$ {
    key(): string;
    number(): number | undefined;
}

export class $Entry extends $Paragraph implements $Entry$ {
    protected keyed = /^\s*([\w-]+):\s*/u;

    key(): string { return reflection.folded(this)?.key() ?? ''; }
    number(): number | undefined { return reflection.numbered(this, reflection.holding(this) ?? this); }

    $Entry(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfEntry));
        const [first, ...rest] = this._block.$elements ?? [];
        const named = typeof first === 'string' ? this.keyed.exec(first) : null;
        if (named !== null && reflection.folded(this) === undefined) {
            const Fold = $(fold);
            this._block = new $Block().concat((first as string).replace(this.keyed, ''), ...rest, $<$Fold>(<Fold>{named[1]}</Fold>));
        }
    }

    // AN ENTRY WRITES ITS OWN NUMBER, as an equation does: its place among the entries of what
    // holds it, read at draw and never kept, written as data on its element so that any reading
    // draws it its own way and none has to count again. Its key is its id, on the element itself:
    // an entry is full of links, and HTML admits no anchor inside an anchor.
    override view(): ReactNode {
        return (
            <p id={reflection.folded(this)?.key()} className={this.className} data-number={this.number()}>
                {this.print()}
            </p>
        );
    }
}

export class $TypeOfEntry extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new EntrySpecification();
}

export class EntrySpecification extends ParagraphSpecification {
    @specify('an entry carries its key')
    $carriesKey(writing: $Writing): void {
        $check(reflection.folded(writing) !== undefined, 'an entry carries its key, and this one carries none');
    }
}

export const Entry = $($Entry);
export const TypeOfEntry = $($TypeOfEntry);
