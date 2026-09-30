import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { identifier } from '@/utilities/Identifier';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification, Block as block } from './Composition';
import { $Sentence } from './Sentence';
import { $Section } from './Section';
import { $Reference, Self as self } from './Reference';
import { Referent as referent } from './Referent';

export class $Heading extends $Sentence {
    specification = new HeadingSpecification();
    get section(): $Section | undefined { return this.parent instanceof $Section ? this.parent : undefined; }
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? html.copy(this.text).trim(); }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    override write(): ReactNode { return binder.reference(html.copy(this.text)) === undefined ? super.write() : this.name; }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-heading');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
        const name = this.name;
        if (name === '') return;
        const link = binder.reference(html.copy(this.text));
        const Referent = $(referent);
        const Self = $(self);
        this.annotations.add(this,
            <Referent>{identifier.slug(name)}</Referent>,
            <Self>{link?.identifier ?? `#${identifier.slug(name)}`}</Self>
        );
    }
}

export class HeadingSpecification extends CompositionSpecification {
    @specify('a heading is in a section')
    $isInASection(heading: $Heading): void {
        $check(heading.section !== undefined, 'a heading stands in a section, and this one does not');
    }
}

export const Heading = $($Heading);
