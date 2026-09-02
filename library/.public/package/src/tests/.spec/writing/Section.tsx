import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A section is written as paragraphs, delineated explicitly. Nothing is parsed
// at this level.
export class $SectionParagraphsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Title>
                    What a section is written as
                </Title>
                <Paragraph>
                    A section is written as paragraphs, and every one of them is delineated by whoever wrote it.
                </Paragraph>
                <Paragraph>
                    Nothing is divided at this level. A paragraph arrives already a paragraph, and the section only gathers what it was given.
                </Paragraph>
            </Section>
        );
    }
}

export const SectionParagraphsSpec = $($SectionParagraphsSpec);

// A section inside a section contributes its parts to the parts, its title
// among them.
export class $SectionNestedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Title>
                    The outer section
                </Title>
                <Section>
                    <Title>
                        The inner section
                    </Title>
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

export const SectionNestedSpec = $($SectionNestedSpec);

// A section may be written as a title and a string of text. That text is one
// paragraph and is not divided further.
export class $SectionTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Title>
                    A section written as prose
                </Title>
                Everything after the title, first character to last, is ONE paragraph. It is not divided at this level, however many sentences it carries.
            </Section>
        );
    }
}

export const SectionTextSpec = $($SectionTextSpec);

// Writing told it is a Section composes the paragraphs written inside it.
export class $SectionWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Title>
                    What a section is written as
                </Title>
                <Paragraph>
                    A section is written as paragraphs, and every one of them is delineated by whoever wrote it.
                </Paragraph>
                <Paragraph>
                    Nothing is divided at this level. A paragraph arrives already a paragraph, and the section only gathers what it was given.
                </Paragraph>
                <Type>Section</Type>
            </Writing>
        );
    }
}

export const SectionWritingSpec = $($SectionWritingSpec);

// A reference to a section stands one meta-level up: writing carrying the
// $Section type whose path must land on a section.
export class $SectionReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>section<Type>$Section</Type><Path>Sn:0</Path></Writing>
        );
    }
}

export const SectionReferenceSpec = $($SectionReferenceSpec);
