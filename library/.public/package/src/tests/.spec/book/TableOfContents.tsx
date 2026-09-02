import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { TableOfContents } from '@/book/TableOfContents';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A table of contents is a chapter kind by the standard type pattern; on a book, the
// cover alone is found by position and the rest are found by kind.
export class $TableOfContentsKindSpec extends $Chemical {
    view(): ReactNode {
        return (
            <TableOfContents><Section><Title>Algebra</Title><Paragraph>It opens.</Paragraph></Section></TableOfContents>
        );
    }
}

export const TableOfContentsKindSpec = $($TableOfContentsKindSpec);
