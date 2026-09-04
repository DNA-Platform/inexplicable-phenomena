import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Heading } from '@/writing/Heading';
import { Paragraph } from '@/writing/Paragraph';

// A cover is a chapter kind by the standard type pattern; on a book, the
// cover alone is found by position and the rest are found by kind.
export class $CoverKindExample extends $Chemical {
    view(): ReactNode {
        return (
            <Cover><Section><Heading>Algebra</Heading><Paragraph>It opens.</Paragraph></Section></Cover>
        );
    }
}

export const CoverKindExample = $($CoverKindExample);
