import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { identifier } from '@/utilities/Identifier';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification, Block as block } from '@/writing/Composition';
import { $Sentence } from '@/writing/Sentence';
import { $Reference, Self as self } from '@/writing/Reference';
import { Referent as referent } from '@/writing/Referent';
import { $Chapter } from './Chapter';

export class $Title extends $Sentence {
    specification = new TitleSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-title');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Self = $(self);
        const Referent = $(referent);
        this.annotations.add(this,
            <Self>{link.identifier}</Self>,
            <Referent>{identifier.slug(link.name)}</Referent>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class TitleSpecification extends CompositionSpecification {
    @specify('a title is in a chapter')
    $isInAChapter(title: $Title): void {
        $check(title.parent instanceof $Chapter, 'a title stands in a chapter, and this one does not');
    }

    @specify('a title holds the link the compiler gives it')
    $holdsItsLink(title: $Title): void {
        $check(title.means !== undefined, 'a title holds the link the compiler gives it, and this one holds none');
    }
}

export const Title = $($Title);
