import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { $, $check } from '@dna-platform/chemistry';
import { $Book, $Format, $Writing, AnnotationSpecification, Paragraph as paragraph, Reference as reference, Word as word, specify } from '@dna-platform/public';

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

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Theme />
        );
    }
}

// AND ITS THEME, which draws the ordinary view: a Format that is also a theme, global to a book, whose
// style hides every annotation's own writing inside the book — Doug, 2026-09-25: "if we want to have a
// theme, it is a format annotation that is also a theme that is global to a book. The annotation
// validate that it is a book. And we can use its style"; and "One might give the book a format called
// Theme which is a theme, which would be realized in its .book or as a resource in one of its chapters."
export class $Theme extends $Format {
    specification = new ThemeSpecification();
    theme = true;
    style = styled.div`
        .pd-annotation {
            display: none;
        }
    `;
}

export class ThemeSpecification extends AnnotationSpecification {
    @specify('a theme is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing instanceof $Book, 'a theme is said of a book, and this is not one');
    }
}

export const Theme = $($Theme);
