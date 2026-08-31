import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Document } from '@/writing/Document';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A document written as a title and paragraphs wraps them in ONE section. No attempt is made to parse sections.
export class $ParagraphsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Document>
                <Title>
                    Writing that skips its sections
                </Title>
                <Paragraph>
                    A document may be written as a title and paragraphs rather than as sections.
                </Paragraph>
                <Paragraph>
                    When it is, the whole of it is gathered into a single section, and no attempt is made to find the ones nobody wrote.
                </Paragraph>
                <Paragraph>
                    The creator of a document does not specify its sections. The parse finds them, and here there are none to find.
                </Paragraph>
            </Document>
        );
    }
}

export const ParagraphsSpec = $($ParagraphsSpec);
