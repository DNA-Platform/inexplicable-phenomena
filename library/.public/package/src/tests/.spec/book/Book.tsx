import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Book } from '@/book/Book';
import { Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A book is a composition of chapters, and as such it satisfies being a composition of documents.
export class $BookChaptersExample extends $Chemical {
    view(): ReactNode {
        return (
            <Book>
                <Chapter>
                    <Section>
                        <Heading>What a book is composed of</Heading>
                        <Paragraph>
                            A book is a composition of chapters, and a chapter is a document.
                        </Paragraph>
                        <Paragraph>
                            The chapters are read in the order they were written, and nothing else records that order.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>What a section will accept</Heading>
                        <Paragraph>
                            A section gathers the paragraphs written inside it, and refuses anything that is not one.
                        </Paragraph>
                    </Section>
                </Chapter>
                <Chapter>
                    <Section>
                        <Heading>The second chapter</Heading>
                        <Paragraph>
                            A second chapter is composed exactly as the first was, because the composition belongs to the type rather than to the class.
                        </Paragraph>
                        <Paragraph>
                            Nothing here names the book that holds it.
                        </Paragraph>
                    </Section>
                </Chapter>
            </Book>
        );
    }
}

export const BookChaptersExample = $($BookChaptersExample);

// Writing told it is a Book carries $TypeOfBook alone, and is therefore a File.
// The writing is the SAME writing as ChaptersExample's, so the only difference between
// the two examples is that one IS a Book and this one merely SAYS it is.
export class $BookWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Chapter>
                    <Section>
                        <Heading>What a book is composed of</Heading>
                        <Paragraph>
                            A book is a composition of chapters, and a chapter is a document.
                        </Paragraph>
                        <Paragraph>
                            The chapters are read in the order they were written, and nothing else records that order.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Heading>What a section will accept</Heading>
                        <Paragraph>
                            A section gathers the paragraphs written inside it, and refuses anything that is not one.
                        </Paragraph>
                    </Section>
                </Chapter>
                <Chapter>
                    <Section>
                        <Heading>The second chapter</Heading>
                        <Paragraph>
                            A second chapter is composed exactly as the first was, because the composition belongs to the type rather than to the class.
                        </Paragraph>
                        <Paragraph>
                            Nothing here names the book that holds it.
                        </Paragraph>
                    </Section>
                </Chapter>
                <Type>Book</Type>
            </Writing>
        );
    }
}

export const BookWritingExample = $($BookWritingExample);

// A reference to a book stands one meta-level up: writing carrying
// <Type>$Book</Type> whose path must land on a book.
export class $BookReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>book<Type>$Book</Type><Path>Bk:0</Path></Writing>
        );
    }
}

export const BookReferenceExample = $($BookReferenceExample);
