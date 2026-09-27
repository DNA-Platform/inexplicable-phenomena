import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Paragraph, $Next, $Previous, Means as means, Reference as reference, Word as word } from '@dna-platform/public';

// A RESOURCE OF THE FIRST CHAPTER: the library's name as a link to the library, which every book of
// the test library could wear, and then the book it stands in and a link to that book's table, read
// from its book alone — so a chapter that wears it never names its book, and a book renamed is
// followed with no edit to the chapter. Doug: "just have the book expose its cover, table,
// synopsis... and other things use it from there." It is the test library's own and faces no reader
// of `.public` — Doug: "that doesn't belong in the .public library. It can be a component of something
// not user facing."
export class $RunningHead extends $Paragraph {
    override write(): ReactNode {
        const book = this.$book;
        if (book === undefined) return null;
        const table = book.table?.canonical;
        const Means = $(means);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Means>$[ The Library ]</Means> / <Word>{book.title?.name}</Word>: <Word><Reference>{table?.means?.identifier}</Reference>{table?.name}</Word>
            </>
        );
    }
}

export const RunningHead = $($RunningHead);

// THE CATCHWORD, at the foot of every chapter of every book: a Previous that shows the previous chapter's
// title and a Next that shows the next's, each linking to that chapter's route — and at the ends, to its
// own chapter, drawn as a self-reference. The words are the resource's business and not the component's:
// a Next draws what is written in it, and these two draw the neighbour's title instead. Doug, 2026-09-27:
// "Next and Previous could reach to their chapter and be chapter references. I like previous of the cover
// is the cover and next of the last chapter is the last chapter."
export class $PreviousTitle extends $Previous {
    override write(): ReactNode { return this.chapter?.previous.title?.name; }
}

export class $NextTitle extends $Next {
    override write(): ReactNode { return this.chapter?.next.title?.name; }
}

export class $Catchword extends $Paragraph {
    $Catchword(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.text.add(this, <PreviousTitle />, <NextTitle />);
    }

    override write(): ReactNode {
        const [Previous, Next] = [...this.text].map(chemical => $(chemical));
        return (
            <>
                <Previous /> · <Next />
            </>
        );
    }
}

export const PreviousTitle = $($PreviousTitle);
export const NextTitle = $($NextTitle);
export const Catchword = $($Catchword);
