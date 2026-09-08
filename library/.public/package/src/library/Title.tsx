import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from '@/writing/Composition';
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
        super.$Section($check(block, $Block, '!').concat($check($TypeOfTitle, '!')));
        if (this.heading() === undefined) {
            const Heading = $(heading);
            this._block = this._block.filter(piece => typeof piece !== 'string').concat($(<Heading>{html.text(this._block)}</Heading>));
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
    override name = 'Title';
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
