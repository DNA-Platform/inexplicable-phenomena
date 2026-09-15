import { reflection } from '@/utilities/Reflection';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $TypeOfSection, SectionSpecification, $Section } from '@/writing/Section';
import { $Reference, Reference as reference } from '@/reference/Reference';

export interface $Title$ extends $Section$ { }

// A TITLE MEANS THE THING IT TITLES, and nobody writes that down — Doug, 2026-09-15: "it should
// mean its chapter, which is the thing it titles. The parent that owns the title, which should be a
// document, should be in charge of the link it represents." So the title asks its document and the
// document answers; a title written with a reference of its own keeps it, and a title standing
// under no document — a name inside a section — means nothing and draws no link.
export class $Title extends $Section implements $Title$ {
    override get meaning(): $Reference | undefined { return super.meaning ?? this.document; }

    // AND IT IS NOT DRAWN AS A LINK TO IT. A title names the thing you are already reading, and a
    // link to where you already are is not a link — Wikipedia's article title is plain text, and the
    // reference implementation anchors its own only because its author wrote an address into it.
    // The address a title would otherwise draw is its chapter's POSITION, which is the library's own
    // address and not a URL: measured 2026-09-15, every article title on every page of Doug's
    // library rendered as `<a href="0">`, a route that does not exist. Doug: "That Doug self link is
    // awful and ruins the flow." So the MEANING above stands — it is what lets a reference elsewhere
    // land on this title — and only the drawing is withdrawn, from here rather than by the base
    // asking what kind of writing it is holding.
    protected override get linked(): $Reference | undefined {
        const written = reflection.meaning(this);

        return written?.addresses === true ? written : undefined;
    }

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
