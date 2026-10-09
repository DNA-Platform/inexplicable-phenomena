import { $, $check } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Section } from '@/writing/Section';
import { $Chapter } from './Chapter';

export class $Part extends $Annotation {
    specification = new PartSpecification();
    get name(): string { return html.copy(this.text).trim(); }
    get section(): $Section | undefined {
        const sections = (composition: $Composition): $Section[] =>
            composition.text.find($Section).flatMap(section => [section, ...sections(section)]);
        const table = this.book?.table;
        return table === undefined ? undefined : sections(table).find(section => section.canonical?.name === this.name);
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-part');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class PartSpecification extends AnnotationSpecification {
    @specify('a part is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a part is said of a chapter, and this is not one');
    }

    @specify("a part names a section of its book's table of contents")
    $namesASection(writing: $Writing): void {
        const part = writing.annotations.expressed($Part);
        $check(part?.section !== undefined,
            `a part names a section of its book's table of contents, and "${part?.name ?? ''}" heads none`);
    }
}

export const Part = $($Part);
