import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Type } from '@/notation/Type';

// Writing told it is a Document composes the sections written inside it.
// The writing is the SAME writing as SectionsSpec's, so the only difference between
// the two examples is that one IS a Document and this one merely SAYS it is.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
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
                <Type>Document</Type>
            </Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
