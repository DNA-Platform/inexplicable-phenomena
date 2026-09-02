import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { File } from '@/writing/File';
import { Document } from '@/writing/Document';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A file is written as documents.
export class $FileDocumentsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <File>
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
            </File>
        );
    }
}

export const FileDocumentsSpec = $($FileDocumentsSpec);

// Writing told it is a File composes the documents written inside it.
// The writing is the SAME writing as DocumentsSpec's, so the only difference between
// the two examples is that one IS a File and this one merely SAYS it is.
export class $FileWritingSpec extends $Chemical {
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

export const FileWritingSpec = $($FileWritingSpec);

// A reference to a file stands one meta-level up: writing carrying
// <Type>$File</Type> whose path must land on a file.
export class $FileReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>file<Type>$File</Type><Path>Fe:0</Path></Writing>
        );
    }
}

export const FileReferenceSpec = $($FileReferenceSpec);
