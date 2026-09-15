import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';
import { $Title, $TypeOfTitle } from './Title';
import { $Author, $TypeOfAuthor } from './Author';
import { $Subject, $TypeOfSubject } from './Subject';

export interface $Cover$ extends $Document$ {
    author(): $Author | undefined;
    subject(): $Subject | undefined;
}

export class $Cover extends $Document implements $Cover$ {
    definition = 'header';
    author(): $Author | undefined { return this.searchForOne<$Author>($TypeOfAuthor); }
    subject(): $Subject | undefined { return this.searchForOne<$Subject>($TypeOfSubject); }

    $Cover(block: $Block) {
        super.$Document(this.addType(block, $TypeOfCover));
    }
}

export class $TypeOfCover extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new CoverSpecification();
}

export class CoverSpecification extends DocumentSpecification {
    @specify('a cover carries its title')
    $carriesTitle(writing: $Writing): void {
        $check(writing.searchFor($TypeOfTitle).length > 0,
            'a cover carries its title, and this one carries none');
    }

    @specify('a cover\'s title means the book')
    $titleMeansTheBook(writing: $Writing): void {
        $check(writing.searchForOne<$Title>($TypeOfTitle)?.meaning !== undefined,
            'a cover\'s title means the book, and this one means nothing');
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
