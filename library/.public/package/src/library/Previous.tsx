import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { $Reference, Reference as reference, Self as self } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $Previous extends $Word {
    specification = new PreviousSpecification();
    get chapter(): $Chapter | undefined {
        let above = this.parent;
        while (above !== undefined && !(above instanceof $Chapter) && above !== above.parent)
            above = above.parent;
        return above instanceof $Chapter ? above : undefined;
    }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Bound(): void {
        const chapter = this.chapter;
        const before = chapter?.before;
        if (before?.mention !== undefined) {
            const Reference = $(before === chapter ? self : reference);
            this.annotations.add(this,
                <Reference>{before.mention.identifier}</Reference>
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
