import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Index } from '@/reference/Index';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';

// References is citations, and the Index is a type of References with a strong
// type — the same persistent stack of links, under its own aid.
export class $IndexSectionSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Index><Reference>alpha<Path>Se:0</Path></Reference></Index>
        );
    }
}

export const IndexSectionSpec = $($IndexSectionSpec);
