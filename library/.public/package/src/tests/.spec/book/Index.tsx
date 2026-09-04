import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Index } from '@/book/Index';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';

// The index is a chapter that takes the references: it persists nothing
// itself — the references it inherits persists under the one shared key,
// and the index pulls it into view.
export class $IndexSectionExample extends $Chemical {
    view(): ReactNode {
        return (
            <Index><Reference>alpha<Path>Se:0</Path></Reference></Index>
        );
    }
}

export const IndexSectionExample = $($IndexSectionExample);
