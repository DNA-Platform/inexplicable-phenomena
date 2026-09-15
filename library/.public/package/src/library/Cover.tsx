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

    // STRUCK 2026-09-15, and the reason is the ruling above it. This demanded that a cover's title
    // hold a written <Reference> — an ADDRESS, typed into a book — which is the web thinking Doug
    // named: "we want to forget the web and think in books." A title already MEANS the thing it
    // titles; the document that owns it answers for where that is, and a book is named by it either
    // way. The demand was also unsatisfiable where it ran: a specification runs at the BOND, and in
    // a browser nothing is above a cover yet, so a title could not reach its document to prove a
    // claim it did not need to make. Measured: five of five pages refused to draw at all.
    // `a cover carries its title` below is what actually had to hold, and it still does.

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
