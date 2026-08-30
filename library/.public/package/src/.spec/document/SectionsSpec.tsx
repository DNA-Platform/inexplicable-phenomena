import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Document } from '@/writing/Document';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A document is written as sections.
export class $SectionsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Document>
                <Section>
                    <Title>
                        How a document is written
                    </Title>
                    <Paragraph>
                        A document is written as sections, and this is the first of them.
                    </Paragraph>
                    <Paragraph>
                        A section holds paragraphs and nothing else.
                    </Paragraph>
                </Section>
                <Section>
                    <Title>
                        And every section after it
                    </Title>
                    <Paragraph>
                        The second section is composed the same way, because every section is.
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}

export const SectionsSpec = $($SectionsSpec);
