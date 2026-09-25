import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Permissive as permissive, Closed as closed } from '@/writing/Composition';
import { $Sentence } from '@/writing/Sentence';
import { $Reference, Reference as reference } from '@/writing/Reference';
import { Referent as referent } from '@/writing/Referent';

export class $Chapter extends $Composition {
    specification = new ChapterSpecification();
    override get canonical(): $Title | undefined {
        return this.contents.find($Title)[0];
    }

    protected override $Define(): void {
        const Level = $(level);
        const Permissive = $(permissive);
        const Closed = $(closed);
        this.annotations.add(this,
            <Level>6</Level>,
            <Permissive />,
            <Closed />
        );
    }
}

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

export class ChapterSpecification extends CompositionSpecification {
    @specify('a chapter has one title')
    $hasOneTitle(chapter: $Chapter): void {
        $check(chapter.contents.find($Title).length === 1,
            'a chapter has one title as its canonical, and this one does not');
    }
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

export const Chapter = $($Chapter);
export const Title = $($Title);
