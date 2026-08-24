import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title as PlainTitle } from '@/writing/Title';
import { ChapterHeading as Title, Listed } from './figures';
// The listing shows the file itself, not a copy of it — so it cannot drift.
import author from '@/book/Author.tsx?raw';


export class $TheAuthorInCode extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Author, In Code</Title>
                    <Paragraph>{'An appendix, because the argument of this book is a claim about a piece of writing, and the piece of writing is short enough to read.'}</Paragraph>
                    <Paragraph>{'Three things are worth pointing at. The first is that an author is a sentence. Not a field on a book, not a record in a table — writing, standing in the cover, which is why its name renders as its name and needs no affordance to say it can be followed.'}</Paragraph>
                    <Paragraph>{'The second is the type it holds. It is a card, never a book. There is a book named in that file, and it appears once, as a type — which is erased before anything runs. So the claim that an author does not reach its book is not a discipline anyone keeps. It is a fact about what is left after compilation.'}</Paragraph>
                    <Paragraph>{'The third is the sentence in the failure. An author that holds no card says so, and says whose it is. A reference that cannot resolve should be able to name itself, because the alternative is a reader staring at an empty space wondering whether anything was ever meant to be there.'}</Paragraph>
                    {''}
                    <Listed of="src/book/Author.tsx" source={author}>The author, as it stands in the package.</Listed>
                    <Paragraph>{'What is above is the file, read at build. It is not a copy of the file kept beside it, which would be a second thing to maintain and a first thing to drift.'}</Paragraph>
                </Section>
                <Summary>
                    <PlainTitle>Summary</PlainTitle>
                    <Paragraph>{'The author is a sentence holding a card, and the book it names survives only as an erased type.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheAuthorInCode = $($TheAuthorInCode);
