import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, $TableOfContents, $Title, Paragraph as paragraph, Parenthetical as parenthetical, Reference as reference, Word as word } from '@dna-platform/public';

// A TABLE OF CONTENTS DRAWN FROM ITS CONTENTS: a section that writes an entry for each mention its
// book's table answers, the first three parenthetical — the cover, the synopsis and the table, which
// is how the compiler writes every book. Doug, 2026-09-26: "have another book with a table of contents
// that is drawn"; "We can assume that chapter 1 is cover, 2 is synopsis and 3 is table, and this will
// help dynamic table generators". A chapter added to the book is listed at the next draw, with no
// edit here. `Entries` is the test library's own name.
export class $Entries extends $Section {
    override write(): ReactNode {
        const contents = this.$book?.table?.annotations.expressed($TableOfContents)?.contents ?? [];
        const Paragraph = $(paragraph);
        const Parenthetical = $(parenthetical);
        const Reference = $(reference);
        const Word = $(word);
        const entry = (mention: (typeof contents)[number], index: number): ReactNode => (
            <Word key={index}><Reference>{mention.identifier}</Reference>{mention.parent instanceof $Title ? mention.parent.name : mention.identifier}</Word>
        );
        return (
            <>
                {super.write()}
                {contents.slice(3).map((mention, index) => <Paragraph key={index}>{entry(mention, index)}</Paragraph>)}
                <Paragraph>
                    <Parenthetical />
                    {contents.slice(0, 3).map(entry)}
                </Paragraph>
            </>
        );
    }
}

export const Entries = $($Entries);
