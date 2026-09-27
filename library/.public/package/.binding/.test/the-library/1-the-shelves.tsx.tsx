import { ReactNode } from 'react';
import { $, $Chemical, selection } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Word, $Next, $Previous, Means as means, Reference as reference, Word as word } from '@dna-platform/public';

// A THEME'S VALUE, READ BY A STYLE: the property named on the theme the format stands inside, or the
// fallback where no theme stands.
export const at = (property: string, fallback = '') =>
    ({ theme }: { theme: Record<string, string | undefined> }): string => theme[property] ?? fallback;

// A RESOURCE OF THE FIRST CHAPTER: the library's name as a link to the library, which every book of
// the test library could wear, and then the book it stands in and a link to that book's table, read
// from its book alone — so a chapter that wears it never names its book, and a book renamed is
// followed with no edit to the chapter. Doug: "just have the book expose its cover, table,
// synopsis... and other things use it from there." It is the test library's own and faces no reader
// of `.public` — Doug: "that doesn't belong in the .public library. It can be a component of something
// not user facing."
export class $RunningHead extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-running-head');
    }

    override write(): ReactNode {
        const book = this.$book;
        if (book === undefined) return null;
        const table = book.table?.canonical;
        const top = book.subject?.means?.identifier === book.title?.means?.identifier;
        const Means = $(means);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                {top ? null : <><Means>$[ The Library ]</Means> / </>}
                <Word>{book.title?.name}</Word>: <Word><Reference>{table?.means?.identifier}</Reference>{table?.name}</Word>
            </>
        );
    }
}

// THE BYLINE: who wrote the book and where it stands, each under a label, read from the book's cover
// alone — so a reader knows which link is the author and which is the subject. Doug, 2026-09-27: "it's
// not clear what will take me to the subject, or who is the author. Help me know where I am."
export class $Label extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-label');
    }
}

export class $Byline extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-byline');
    }

    override write(): ReactNode {
        const book = this.$book;
        if (book === undefined) return null;
        const Label = $(label);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Label>Author</Label> <Word><Reference>{book.author?.means?.identifier}</Reference>{book.author?.name}</Word>
                <Label>Filed under</Label> <Word><Reference>{book.subject?.means?.identifier}</Reference>{book.subject?.name}</Word>
            </>
        );
    }
}

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

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-catchword');
    }
}

// NAVIGABLE: the library's own dress for finding one's way, a Format stood on the book in front of its
// theme and reading it — the running head a masthead, the byline two labelled rows, the catchword a
// footer line, each by the mark its kind wears. The theme dresses the framework's marks; this dresses the
// library's own. Doug, 2026-09-27: "review that it looks navigable, and if not, add some annotations or
// components to the test library that can be used in that theme to provide a more professional experience."
export class $Navigable extends $Format {
    style = selection.div`
        .pd-running-head {
            font-size: calc(0.75 * ${at('size', '1rem')});
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding-block-end: calc(${at('space', '1rem')} / 2);
            border-block-end: 1px solid ${at('ink', 'currentColor')};
        }
        .pd-byline {
            display: grid;
            grid-template-columns: max-content 1fr;
            column-gap: ${at('space', '1rem')};
            row-gap: calc(${at('space', '1rem')} / 4);
            align-items: baseline;
        }
        .pd-label {
            font-size: calc(0.7 * ${at('size', '1rem')});
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.65;
        }
        .pd-catchword {
            font-size: calc(0.85 * ${at('size', '1rem')});
            text-align: end;
            margin-block-end: 0;
            padding-block-start: calc(${at('space', '1rem')} / 2);
            border-block-start: 1px solid ${at('ink', 'currentColor')};
        }
    `;
}

export const RunningHead = $($RunningHead);
export const Label = $($Label);
const label = Label;
export const Byline = $($Byline);
export const PreviousTitle = $($PreviousTitle);
export const NextTitle = $($NextTitle);
export const Catchword = $($Catchword);
export const Navigable = $($Navigable);
