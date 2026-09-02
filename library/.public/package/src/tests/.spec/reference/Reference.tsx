import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';
import { Letter } from '@/writing/Letter';
import { Word } from '@/writing/Word';
import { Writing, Type } from '@/writing/Writing';

// The two halves stay apart: the copy is the identification a reader sees and
// the parenthetical path is the location, which is never one of the parts.
export class $ReferencePathSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Reference>Algebra<Path>/books/algebra</Path></Reference>
        );
    }
}

export const ReferencePathSpec = $($ReferencePathSpec);

// A reference is writing; the letters of its identification are written here,
// standing beside the parenthetical path.
export class $ReferenceLettersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Reference>
                <Letter>A</Letter>
                <Letter>B</Letter>
                <Path>/books/algebra</Path>
            </Reference>
        );
    }
}

export const ReferenceLettersSpec = $($ReferenceLettersSpec);

// Writing told it is a Reference must carry a path, and it need not derive from
// $Reference to be one — the type holds the rule, so any writing can satisfy it.
export class $ReferenceWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>Algebra<Path>/books/algebra</Path><Type>Reference</Type></Writing>
        );
    }
}

export const ReferenceWritingSpec = $($ReferenceWritingSpec);

// A printed handle carries its path AND holds what it stands for — the loaded
// case, whose read() resolves at once while the path still says where it points.
export class $ReferenceHoldsSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Reference><Word><Letter>h</Letter><Letter>i</Letter></Word><Path>Wd:0</Path></Reference>
        );
    }
}

export const ReferenceHoldsSpec = $($ReferenceHoldsSpec);
