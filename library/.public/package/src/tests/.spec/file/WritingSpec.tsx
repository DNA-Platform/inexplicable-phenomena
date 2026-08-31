import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Document } from '@/writing/Document';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Type } from '@/notation/Type';

// Writing told it is a File composes the documents written inside it.
// The writing is the SAME writing as DocumentsSpec's, so the only difference between
// the two examples is that one IS a File and this one merely SAYS it is.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Document>
                    <Section>
                        <Title>
                            What a file is written as
                        </Title>
                        <Paragraph>
                            A file is written as documents, and refuses anything written at another level.
                        </Paragraph>
                        <Paragraph>
                            This is the first of its documents, and it holds one section.
                        </Paragraph>
                    </Section>
                </Document>
                <Document>
                    <Section>
                        <Title>
                            The second document
                        </Title>
                        <Paragraph>
                            The second document sits beside the first and shares nothing with it but the file.
                        </Paragraph>
                    </Section>
                    <Section>
                        <Title>
                            And its second section
                        </Title>
                        <Paragraph>
                            A document may hold as many sections as it was written with.
                        </Paragraph>
                    </Section>
                </Document>
                <Type>File</Type>
            </Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
