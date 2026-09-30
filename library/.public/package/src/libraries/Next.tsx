import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { $Reference, Reference as reference, Self as self } from '@/writing/Reference';

export class $Next extends $Word {
    specification = new NextSpecification();
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-next');
    }

    protected override $Bound(): void {
        const chapter = this.chapter;
        const next = chapter?.next;
        if (next?.mention !== undefined) {
            const Reference = $(next === chapter ? self : reference);
            this.annotations.add(this,
                <Reference>{next.mention.identifier}</Reference>
            );
            this.annotations.define();
        }
        super.$Bound();
    }
}

export class NextSpecification extends CompositionSpecification {
    @specify('a next stands in a chapter')
    $standsInAChapter(next: $Next): void {
        $check(next.chapter !== undefined, 'a next stands in a chapter, and this one does not');
    }

    @specify('a next means the chapter after its own')
    $meansTheChapterAfter(next: $Next): void {
        $check(next.means !== undefined, 'a next means the chapter after its own, and this one means nothing');
    }
}

export const Next = $($Next);
