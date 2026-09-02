import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Highlight } from '@/book/Highlight';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';

// A highlight is a dynamically typed pair of references of the same kind — its
// substance is its pair, and it says nothing of its own.
export class $HighlightPairSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Highlight><Reference>from<Path>Lr:1</Path></Reference><Reference>to<Path>Lr:3</Path></Reference></Highlight>
        );
    }
}

export const HighlightPairSpec = $($HighlightPairSpec);
