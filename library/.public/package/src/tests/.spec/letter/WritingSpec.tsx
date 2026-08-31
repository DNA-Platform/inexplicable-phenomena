import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Type } from '@/notation/Type';

// Writing told it is a Letter reads as one, without being written as one.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>a<Type>Letter</Type></Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
