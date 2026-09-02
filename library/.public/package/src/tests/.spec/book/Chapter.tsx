import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A chapter IS a document, so it is written as sections and answers every document constraint.
export class $ChapterSectionsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Chapter>
                <Section>
                    <Title>
                        What a chapter promises
                    </Title>
                    <Paragraph>
                        A chapter is a document, so everything a document promises it promises too.
                    </Paragraph>
                    <Paragraph>
                        It is written as sections, and a section is written as paragraphs.
                    </Paragraph>
                </Section>
                <Section>
                    <Title>
                        What a second section knows
                    </Title>
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

export const ChapterSectionsSpec = $($ChapterSectionsSpec);

// Writing told it is a Chapter carries $TypeOfChapter alone, and is therefore a Document.
// The writing is the SAME writing as SectionsSpec's, so the only difference between
// the two examples is that one IS a Chapter and this one merely SAYS it is.
export class $ChapterWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Section>
                    <Title>
                        What a chapter promises
                    </Title>
                    <Paragraph>
                        A chapter is a document, so everything a document promises it promises too.
                    </Paragraph>
                    <Paragraph>
                        It is written as sections, and a section is written as paragraphs.
                    </Paragraph>
                </Section>
                <Section>
                    <Title>
                        What a second section knows
                    </Title>
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

export const ChapterWritingSpec = $($ChapterWritingSpec);

// A reference to a chapter stands one meta-level up: writing carrying
// <Type>$Chapter</Type> whose path must land on a chapter.
export class $ChapterReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>chapter<Type>$Chapter</Type><Path>Cr:0</Path></Writing>
        );
    }
}

export const ChapterReferenceSpec = $($ChapterReferenceSpec);
