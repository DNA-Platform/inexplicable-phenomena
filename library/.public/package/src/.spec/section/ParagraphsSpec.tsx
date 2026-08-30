import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A section is written as paragraphs, delineated explicitly. Nothing is parsed at this level.
export class $ParagraphsSpec extends $Chemical {
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

export const ParagraphsSpec = $($ParagraphsSpec);
