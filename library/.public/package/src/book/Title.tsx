import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';
import { $Writing } from '@/writing/Writing';
import { $Reference$, $Reference, $TypeOfReference } from '@/reference/Reference';
import { $Composition } from '@/writing/Composition';
import { $TypeOfHeading } from '@/writing/Heading';
import { $Section$, $TypeOfSection, SectionSpecification } from '@/writing/Section';

export interface $Title$ extends $Section$ { }

export class $Title extends $Composition implements $Title$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    reference(): $Reference$ | undefined {
        return this.heading()?.searchForOne<$Reference>($TypeOfReference)
            ?? this.searchForOne<$Reference>($TypeOfReference);
    }

    $Title(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfTitle)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfTitle, '!')];
    }

    override view(): ReactNode {
        const Block = $(this._block);
        const Anchor = $(anchor);
        const url = html.text(this.reference()?.path()?._block);

        return (
            <Anchor href={url}>
                <Block />
            </Anchor>
        );
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

    @specify('a title means the book')
    $meansTheBook(writing: $Writing): void {
        $check(writing.means() !== undefined,
            'a title means the book, and this one means nothing');
    }
}

export const Title = $($Title);
export const TypeOfTitle = $($TypeOfTitle);
const typeOfTitle = TypeOfTitle;
