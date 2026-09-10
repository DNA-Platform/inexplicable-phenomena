import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from '@/writing/Composition';
import { $Annotation } from '@/writing/Annotation';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $TypeOfSection, SectionSpecification, $Section } from '@/writing/Section';
import { $TypeOfCover } from './Cover';

export interface $Title$ extends $Section$ { }

export class $Title extends $Section implements $Title$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    canonical(): $Title | undefined {
        if (html.text(this._block).trim() !== '') return undefined;
        const held = this.book.searchForOne<$Writing>($TypeOfCover)?.searchForOne<$Title>($TypeOfTitle);

        return held === this ? undefined : held;
    }

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
            const said = ((this._block.$elements ?? []) as unknown[]).filter(piece => !(piece instanceof $Annotation));
            this._block = this._block.filter(piece => piece instanceof $Annotation).concat($<$Writing>(<Heading />, ...said as never[]));
        }
    }

    override view(): ReactNode {
        const held = this.canonical();
        if (held === undefined) return super.view();
        const Canonical = $(held);

        return <Canonical />;
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

    // A TITLE THAT SAYS NOTHING IS STANDING IN FOR THE BOOK'S, and it is judged by the title it
    // stands for rather than by itself. This rule refused that form outright — measured 2026-09-09:
    // an empty <Title /> written into a section drew two refusal panels reading "a title means what
    // it titles, and this one means nothing", so canonical() was never asked and the whole feature
    // it exists for could not run. AND IT CANNOT BE MET BY DEFERRING `meaning` TO canonical(): a
    // rule runs inside the bond chain, before a writing is held by anything, so the book it would
    // ask is not reachable yet. What it says is decided where it stands, at draw.
    @specify('a title means what it titles')
    $meansTheBook(writing: $Writing): void {
        $check(writing.meaning !== undefined || html.text(writing._block).trim() === '',
            'a title means what it titles, and this one means nothing');
    }

}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
