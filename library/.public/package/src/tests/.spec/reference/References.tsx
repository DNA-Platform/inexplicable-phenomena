import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { References } from '@/reference/References';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';

// The references section every document keeps at its end — parenthetical until
// $print flips it into the flow, serializing reactively as references arrive.
export class $ReferencesSectionSpec extends $Chemical {
    view(): ReactNode {
        return (
            <References><Reference>alpha<Path>Se:0</Path></Reference></References>
        );
    }
}

export const ReferencesSectionSpec = $($ReferencesSectionSpec);
