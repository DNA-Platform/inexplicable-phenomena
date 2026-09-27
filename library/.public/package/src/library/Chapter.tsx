import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Composition, CompositionSpecification, Level as level, Permissive as permissive, Closed as closed } from '@/writing/Composition';
import { $Reference } from '@/writing/Reference';
import { $Title } from './Title';

export class $Chapter extends $Composition {
    specification = new ChapterSpecification();
    get title(): $Title | undefined { return this.canonical; }
    get mention(): $Reference | undefined { return this.title?.means; }
    get next(): $Chapter {
        const chapters = this.$book?.text.find($Chapter) ?? [];
        const at = chapters.indexOf(this);
        return at === -1 ? this : chapters[at + 1] ?? this;
    }
    get previous(): $Chapter {
        const chapters = this.$book?.text.find($Chapter) ?? [];
        const at = chapters.indexOf(this);
        return at === -1 ? this : chapters[at - 1] ?? this;
    }
    override get canonical(): $Title | undefined {
        return this.text.find($Title)[0];
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

export class ChapterSpecification extends CompositionSpecification {
    @specify('a chapter has one title')
    $hasOneTitle(chapter: $Chapter): void {
        $check(chapter.text.find($Title).length === 1,
            'a chapter has one title as its canonical, and this one does not');
    }
}

export const Chapter = $($Chapter);
