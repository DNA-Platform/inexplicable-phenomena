import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Composition } from '@/writing/Composition';
import { $Writing } from '@/writing/Writing';
import { $TypeOfHeading, Heading as heading } from '@/writing/Heading';
import { html } from '@/utilities/Html';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Title$ extends $Section$ { }

export class $Title extends $Composition implements $Title$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }

    $Title(block: $Block) {
        super.$Composition($check(block, $Block).concat($check($TypeOfTitle, '!')));
        if (this.heading() === undefined) {
            const Heading = $(heading);
            this._block = this._block.filter(piece => typeof piece !== 'string').concat($(<Heading>{html.text(this._block)}</Heading>));
        }
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

    @specify('a title means what it titles')
    $meansTheBook(writing: $Writing): void {
        $check(writing.meaning !== undefined,
            'a title means what it titles, and this one means nothing');
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
