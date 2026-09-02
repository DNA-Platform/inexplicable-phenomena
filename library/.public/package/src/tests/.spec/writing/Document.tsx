import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Document } from '@/writing/Document';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Section } from '@/writing/Section';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A document written as a title and paragraphs wraps them in ONE section. No attempt is made to parse sections.
export class $DocumentParagraphsSpec extends $Chemical {
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

export const DocumentParagraphsSpec = $($DocumentParagraphsSpec);

// A document is written as sections.
export class $DocumentSectionsSpec extends $Chemical {
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

export const DocumentSectionsSpec = $($DocumentSectionsSpec);

// Writing told it is a Document composes the sections written inside it.
// The writing is the SAME writing as SectionsSpec's, so the only difference between
// the two examples is that one IS a Document and this one merely SAYS it is.
export class $DocumentWritingSpec extends $Chemical {
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

export const DocumentWritingSpec = $($DocumentWritingSpec);

// A reference to a document stands one meta-level up: writing carrying
// <Type>$Document</Type> whose path must land on a document.
export class $DocumentReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>document<Type>$Document</Type><Path>Dt:0</Path></Writing>
        );
    }
}

export const DocumentReferenceSpec = $($DocumentReferenceSpec);
