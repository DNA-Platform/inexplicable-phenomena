import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Cell } from '@/writing/Cell';

// A cell is a level-free seat: its container confers the level one down from
// its own, so the same cell is a paragraph in one table and a word in another.
export class $CellWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Cell>alpha beta</Cell>
        );
    }
}

export const CellWritingSpec = $($CellWritingSpec);
