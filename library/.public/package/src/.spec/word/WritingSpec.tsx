import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Type } from '@/notation/Type';

// Writing told it is a Word composes the same letters a written Word does.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>hi<Type>Word</Type></Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
