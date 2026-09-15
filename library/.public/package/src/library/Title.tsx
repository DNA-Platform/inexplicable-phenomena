import { reflection } from '@/utilities/Reflection';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $TypeOfSection, SectionSpecification, $Section } from '@/writing/Section';

export interface $Title$ extends $Section$ { }

export class $Title extends $Section implements $Title$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Title(block: $Block) {
        super.$Section(this.addType(block, $TypeOfTitle));
        // A TITLE'S HEADING HOLDS THE TITLE'S CONTENT, not its text. It read html.text(this._block)
        // and dropped every string, so a title written as WRITING drew TWICE — measured 2026-09-09
        // with the real paper's title, which is a formula: the <Math> survived the string filter and
        // drew its KaTeX, and the heading built from the text drew `\mathsf{P} \stackrel{?}{=}
        // \mathsf{NP}` beside it. Doug: "What's wrong with a title written in latex notation?"
        // Nothing — a title is a piece of writing like any other, so what it holds MOVES into the
        // heading. Annotations stay behind, because a $Type and the $Reference that gives the title
        // its meaning belong to the title and not to the words.
        if (this.heading() === undefined) {
            const Heading = $(heading);
            const said = ((this._block.$elements ?? []) as unknown[]).filter(piece => !reflection.annotation(piece));
            this._block = this._block.filter(piece => reflection.annotation(piece)).concat($<$Writing>(<Heading />, ...said as never[]));
        }
    }

}

export class $TypeOfTitle extends $TypeOfSection {
    protected override specification: Specification<$Writing> = new TitleSpecification();
}

export class TitleSpecification extends SectionSpecification {
    @specify('a title is its own heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
