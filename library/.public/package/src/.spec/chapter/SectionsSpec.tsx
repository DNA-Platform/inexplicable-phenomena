import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A chapter IS a document, so it is written as sections and answers every document constraint.
export class $SectionsSpec extends $Chemical {
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

export const SectionsSpec = $($SectionsSpec);
