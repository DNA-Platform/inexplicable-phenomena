import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Title } from '@/writing/Title';

// A title is a paragraph kind: it heads the section holding it, draws as a
// heading, and is never canonical writing.
export class $TitleKindExample extends $Chemical {
    view(): ReactNode {
        return (
            <Title>The Shape of Everything</Title>
        );
    }
}

export const TitleKindExample = $($TitleKindExample);
