import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Heading } from '@/writing/Heading';

// A heading is a paragraph kind: it opens the section holding it, draws as a
// heading, and is never canonical writing.
export class $HeadingKindExample extends $Chemical {
    view(): ReactNode {
        return (
            <Heading>The Shape of Everything</Heading>
        );
    }
}

export const HeadingKindExample = $($HeadingKindExample);
