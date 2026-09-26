import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Reference, Reference as reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $Synopsis extends $Format {
    specification = new SynopsisSpecification();
    get chapter(): $Chapter | undefined { return this.parent instanceof $Chapter ? this.parent : undefined; }
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    override write(): ReactNode { return this.name; }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-synopsis');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    protected override $Bound(): void {
        const identifier = this.means?.identifier
            ?? this.chapter?.text.find($Chapter).find(chapter => chapter.is($Synopsis))?.annotations.expressed($Synopsis)?.means?.identifier
            ?? this.chapter?.mention?.identifier.split('#')[0];
        if (identifier !== undefined && this.means === undefined) {
            const Reference = $(reference);
            this.annotations.add(this,
                <Reference>{identifier}</Reference>
            );
            this.annotations.define();
        }
        super.$Bound();
    }
}

export class SynopsisSpecification extends AnnotationSpecification {
    @specify('a synopsis is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a synopsis is said of a chapter, and this is not one');
    }
}

export const Synopsis = $($Synopsis);
