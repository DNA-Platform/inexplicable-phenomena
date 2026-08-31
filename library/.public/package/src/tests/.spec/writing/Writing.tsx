import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';

// MEANING IS OPTIONAL. Writing that carries a reference means what the reference
// refers to; writing that carries none means nothing formally, because meaning
// may be informal to the app.
export class $WritingMeansSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>Read <Reference>Algebra<Path>/books/algebra</Path></Reference></Sentence>
        );
    }
}

export const WritingMeansSpec = $($WritingMeansSpec);

// The same sentence with nothing to mean. A handle never appears here: incoming
// reference is compiled, never authored, so there is no markup for one.
export class $WritingPlainSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence><Word>Read</Word> <Word>on</Word></Sentence>
        );
    }
}

export const WritingPlainSpec = $($WritingPlainSpec);
