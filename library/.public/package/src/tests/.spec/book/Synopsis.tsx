import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';

// A synopsis is a chapter kind by the standard type pattern; on a book, the
// cover alone is found by position and the rest are found by kind.
export class $SynopsisKindExample extends $Chemical {
    view(): ReactNode {
        return (
            <Synopsis><Section><Title>Algebra</Title><Paragraph>It opens.</Paragraph></Section></Synopsis>
        );
    }
}

export const SynopsisKindExample = $($SynopsisKindExample);
