import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from '@/writing/Composition';
import { $Sentence } from '@/writing/Sentence';
import { $Reference, Reference as reference } from '@/writing/Reference';
import { Referent as referent } from '@/writing/Referent';
import { $Chapter } from './Chapter';

export class $Title extends $Sentence {
    specification = new TitleSpecification();
    get chapter(): $Chapter | undefined { return this.parent instanceof $Chapter ? this.parent : undefined; }
    get text(): string { return binder.reference(html.copy(this.contents))?.text ?? ''; }
    get reference(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.contents));
        if (link === undefined) return;
        const [, fragment] = link.identifier.split('#');
        const Reference = $(reference);
        const Referent = $(referent);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>,
            ...(fragment ? [<Referent>{fragment}</Referent>] : [])
        );
    }

    override write(): ReactNode { return this.text; }
}

export class TitleSpecification extends CompositionSpecification {
    @specify('a title is in a chapter')
    $isInAChapter(title: $Title): void {
        $check(title.chapter !== undefined, 'a title stands in a chapter, and this one does not');
    }

    @specify('a title holds the link the compiler gives it')
    $holdsItsLink(title: $Title): void {
        $check(title.reference !== undefined, 'a title holds the link the compiler gives it, and this one holds none');
    }
}

export const Title = $($Title);
