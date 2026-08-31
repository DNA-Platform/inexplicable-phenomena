import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Book } from '@/book/Book';
import { Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';

// A book is a composition of chapters, and as such it satisfies being a composition of documents.
export class $BookChaptersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Book>
                <Chapter>
                    <Section>
                        <Title>
                            What a book is composed of
                        </Title>
                        <Paragraph>
                            A book is a composition of chapters, and a chapter is a document.
                        </Paragraph>
                        <Paragraph>
                            The chapters are read in the order they were written, and nothing else records that order.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Title>
                            What a section will accept
                        </Title>
                        <Paragraph>
                            A section gathers the paragraphs written inside it, and refuses anything that is not one.
                        </Paragraph>
                    </Section>
                </Chapter>
                <Chapter>
                    <Section>
                        <Title>
                            The second chapter
                        </Title>
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

export const BookChaptersSpec = $($BookChaptersSpec);

// Writing told it is a Book carries $TypeOfBook alone, and is therefore a File.
// The writing is the SAME writing as ChaptersSpec's, so the only difference between
// the two examples is that one IS a Book and this one merely SAYS it is.
export class $BookWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Chapter>
                    <Section>
                        <Title>
                            What a book is composed of
                        </Title>
                        <Paragraph>
                            A book is a composition of chapters, and a chapter is a document.
                        </Paragraph>
                        <Paragraph>
                            The chapters are read in the order they were written, and nothing else records that order.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Title>
                            What a section will accept
                        </Title>
                        <Paragraph>
                            A section gathers the paragraphs written inside it, and refuses anything that is not one.
                        </Paragraph>
                    </Section>
                </Chapter>
                <Chapter>
                    <Section>
                        <Title>
                            The second chapter
                        </Title>
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

export const BookWritingSpec = $($BookWritingSpec);
