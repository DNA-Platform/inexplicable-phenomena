import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Paragraph } from '@/writing/Paragraph';

// A paragraph may hold text where a section may not. Dividing it into sentences is not built.
export class $TextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Paragraph>A paragraph may carry text.</Paragraph>
        );
    }
}

export const TextSpec = $($TextSpec);
