import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from '@/writing/Composition';
import { $Word } from '@/writing/Word';
import { $Reference, Reference as reference, Self as self } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $Next extends $Word {
    specification = new NextSpecification();
    get chapter(): $Chapter | undefined {
        let above = this.parent;
        while (above !== undefined && !(above instanceof $Chapter) && above !== above.parent)
            above = above.parent;
        return above instanceof $Chapter ? above : undefined;
    }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Bound(): void {
        const chapter = this.chapter;
        const after = chapter?.after;
        if (after?.mention !== undefined) {
            const Reference = $(after === chapter ? self : reference);
            this.annotations.add(this,
                <Reference>{after.mention.identifier}</Reference>
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
