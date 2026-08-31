import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Type } from '@/notation/Type';

// Writing told it is a Paragraph reads as one.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>A paragraph, told.<Type>Paragraph</Type></Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
