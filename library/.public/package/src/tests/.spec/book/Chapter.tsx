import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A chapter IS a document, so it is written as sections and answers every document constraint.
export class $ChapterSectionsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Chapter>
                <Section>
                    <Heading>What a chapter promises</Heading>
                    <Paragraph>
                        A chapter is a document, so everything a document promises it promises too.
                    </Paragraph>
                    <Paragraph>
                        It is written as sections, and a section is written as paragraphs.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>What a second section knows</Heading>
                    <Paragraph>
                        A second section sits beside the first and knows nothing about it.
                    </Paragraph>
                    <Paragraph>
                        Their order is the order they were written in.
                    </Paragraph>
                </Section>
            </Chapter>
        );
    }
}

export const ChapterSectionsExample = $($ChapterSectionsExample);

// Writing told it is a Chapter carries $TypeOfChapter alone, and is therefore a Document.
// The writing is the SAME writing as SectionsExample's, so the only difference between
// the two examples is that one IS a Chapter and this one merely SAYS it is.
export class $ChapterWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Section>
                    <Heading>What a chapter promises</Heading>
                    <Paragraph>
                        A chapter is a document, so everything a document promises it promises too.
                    </Paragraph>
                    <Paragraph>
                        It is written as sections, and a section is written as paragraphs.
                    </Paragraph>
                </Section>
                <Section>
                    <Heading>What a second section knows</Heading>
                    <Paragraph>
                        A second section sits beside the first and knows nothing about it.
                    </Paragraph>
                    <Paragraph>
                        Their order is the order they were written in.
                    </Paragraph>
                </Section>
                <Type>Chapter</Type>
            </Writing>
        );
    }
}

export const ChapterWritingExample = $($ChapterWritingExample);

// A reference to a chapter stands one meta-level up: writing carrying
// <Type>$Chapter</Type> whose path must land on a chapter.
export class $ChapterReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>chapter<Type>$Chapter</Type><Path>Cr:0</Path></Writing>
        );
    }
}

export const ChapterReferenceExample = $($ChapterReferenceExample);
