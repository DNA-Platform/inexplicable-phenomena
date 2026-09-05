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

export interface $Subject$ extends $Section$ { }

export class $Subject extends $Composition implements $Subject$ {
    heading(): $Writing | undefined { return this.searchForOne($TypeOfHeading); }
    reference(): $Reference$ | undefined {
        return this.heading()?.searchForOne<$Reference>($TypeOfReference)
            ?? this.searchForOne<$Reference>($TypeOfReference);
    }

    $Subject(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfSubject)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfSubject, '!')];
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

export class $TypeOfSubject extends $TypeOfSection {
    override name = 'Subject';
    protected override specification: Specification<$Writing> = new SubjectSpecification();
}

export class SubjectSpecification extends SectionSpecification {
    @specify('a subject is its own heading')
    override $opensWithHeading(writing: $Writing): boolean | void {
        return false;
    }
}

export const Subject = $($Subject);
export const TypeOfSubject = $($TypeOfSubject);
const typeOfSubject = TypeOfSubject;
