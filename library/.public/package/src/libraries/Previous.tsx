import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { $Reference, Reference as reference, Self as self } from '@/writing/Reference';

export class $Previous extends $Word {
    specification = new PreviousSpecification();
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-previous');
    }

    protected override $Bound(): void {
        const chapter = this.chapter;
        const previous = chapter?.previous;
        if (previous?.mention !== undefined) {
            const Reference = $(previous === chapter ? self : reference);
            this.annotations.add(this,
                <Reference>{previous.mention.identifier}</Reference>
            );
            this.annotations.define();
        }
        super.$Bound();
    }
}

export class PreviousSpecification extends CompositionSpecification {
    @specify('a previous stands in a chapter')
    $standsInAChapter(previous: $Previous): void {
        $check(previous.chapter !== undefined, 'a previous stands in a chapter, and this one does not');
    }

    @specify('a previous means the chapter before its own')
    $meansTheChapterBefore(previous: $Previous): void {
        $check(previous.means !== undefined, 'a previous means the chapter before its own, and this one means nothing');
    }
}

export const Previous = $($Previous);
