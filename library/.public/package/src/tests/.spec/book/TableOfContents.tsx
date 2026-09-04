import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { TableOfContents } from '@/book/TableOfContents';
import { Section } from '@/writing/Section';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';

// A table of contents is a chapter kind by the standard type pattern; on a book, the
// cover alone is found by position and the rest are found by kind.
export class $TableOfContentsKindExample extends $Chemical {
    view(): ReactNode {
        return (
            <TableOfContents><Section><Heading>Algebra</Heading><Paragraph>It opens.</Paragraph></Section></TableOfContents>
        );
    }
}

export const TableOfContentsKindExample = $($TableOfContentsKindExample);
