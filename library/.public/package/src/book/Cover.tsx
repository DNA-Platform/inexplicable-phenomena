import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Chapter$, $TypeOfChapter, ChapterSpecification, Chapter as chapter } from './Chapter';
import { $Title, $TypeOfTitle } from './Title';
import { $Author, $TypeOfAuthor } from './Author';
import { $Subject, $TypeOfSubject } from './Subject';

export interface $Cover$ extends $Chapter$ {
    title(): $Title | undefined;
    author(): $Author | undefined;
    subject(): $Subject | undefined;
}

export class $Cover extends $Composition implements $Cover$ {
    title(): $Title | undefined { return this.searchForOne<$Title>($TypeOfTitle); }
    author(): $Author | undefined { return this.searchForOne<$Author>($TypeOfAuthor); }
    subject(): $Subject | undefined { return this.searchForOne<$Subject>($TypeOfSubject); }

    $Cover(block: $Block) {
        super.$Composition(block);
        if (reflection.is(this, $TypeOfCover)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfCover, '!')];
    }

    override frame(): ReactNode {
        const Chapter = $(chapter);

        return <Chapter>{super.frame()}</Chapter>;
    }
}

export class $TypeOfCover extends $TypeOfChapter {
    override name = 'Cover';
    protected override specification: Specification<$Writing> = new CoverSpecification();
}

export class CoverSpecification extends ChapterSpecification {
    @specify('a cover carries its title')
    $carriesTitle(writing: $Writing): void {
        $check(writing.searchFor($TypeOfTitle).length > 0,
            'a cover carries its title, and this one carries none');
    }

    @specify('a cover carries its author')
    $carriesAuthor(writing: $Writing): void {
        $check(writing.searchFor($TypeOfAuthor).length > 0,
            'a cover carries its author, and this one carries none');
    }

    @specify('a cover carries its subject')
    $carriesSubject(writing: $Writing): void {
        $check(writing.searchFor($TypeOfSubject).length > 0,
            'a cover carries its subject, and this one carries none');
    }
}

export const Cover = $($Cover);
export const TypeOfCover = $($TypeOfCover);
const typeOfCover = TypeOfCover;
