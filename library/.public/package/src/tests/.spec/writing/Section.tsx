import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A section is written as paragraphs, delineated explicitly. Nothing is parsed
// at this level.
export class $SectionParagraphsExample extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Heading>What a section is written as</Heading>
                <Paragraph>
                    A section is written as paragraphs, and every one of them is delineated by whoever wrote it
                </Paragraph>
                <Paragraph>
                    A paragraph arrives already a paragraph, and the section only gathers what it was given
                </Paragraph>
            </Section>
        );
    }
}

export const SectionParagraphsExample = $($SectionParagraphsExample);

// A section inside a section contributes its parts to the parts, its title
// among them.
export class $SectionNestedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Heading>The outer section</Heading>
                <Section>
                    <Heading>The inner section</Heading>
                    <Paragraph>
                        The nested contributes its parts to the parts, its title among them.
                    </Paragraph>
                </Section>
                <Paragraph>
                    The outer keeps its own paragraphs beside what the inner contributed.
                </Paragraph>
            </Section>
        );
    }
}

export const SectionNestedExample = $($SectionNestedExample);

// A section may be written as a title and a string of text. That text is one
// paragraph and is not divided further.
export class $SectionTextExample extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Heading>A section written as prose</Heading>
                Everything after the heading, first character to last, is ONE paragraph
            </Section>
        );
    }
}

export const SectionTextExample = $($SectionTextExample);

// Writing told it is a Section composes the paragraphs written inside it.
export class $SectionWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Heading>What a section is written as</Heading>
                <Paragraph>
                    A section is written as paragraphs, and every one of them is delineated by whoever wrote it
                </Paragraph>
                <Paragraph>
                    A paragraph arrives already a paragraph, and the section only gathers what it was given
                </Paragraph>
                <Type>Section</Type>
            </Writing>
        );
    }
}

export const SectionWritingExample = $($SectionWritingExample);

// A reference to a section stands one meta-level up: writing carrying the
// $Section type whose path must land on a section.
export class $SectionReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>section<Type>$Section</Type><Path>Sn:0</Path></Writing>
        );
    }
}

export const SectionReferenceExample = $($SectionReferenceExample);
