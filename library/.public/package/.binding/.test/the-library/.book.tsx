import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Paragraph as paragraph, Reference as reference, Word as word } from '@dna-platform/public';

// THE TEST LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a
// real library extends the library's — so a change to what a book is here reaches all five. It is
// the layout, and it draws what the book exposes of its cover: who wrote it and what it is filed under.
export default class $TheLibrary extends $Book {
    override write(): ReactNode {
        const Paragraph = $(paragraph);
        const Word = $(word);
        const Reference = $(reference);
        return (
            <>
                <Paragraph>
                    by <Word><Reference>{this.author?.reference?.identifier}</Reference>{this.author?.text}</Word>,
                    filed under <Word><Reference>{this.subject?.reference?.identifier}</Reference>{this.subject?.text}</Word>
                </Paragraph>
                {super.write()}
            </>
        );
    }
}
