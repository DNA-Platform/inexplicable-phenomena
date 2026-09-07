import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { $Annotation$, $Annotation } from './Annotation';
import { reflection } from '@/utilities/Reflection';

export interface $Type$ extends $Annotation$ { }

export class $Type extends $Annotation implements $Type$ {
    name = 'Type';

    below(): (new() => $Type) | undefined { return undefined; }
    makes(tokens: (string | $Writing)[]): $Writing[] { return []; }
    format(drawn: ReactNode): ReactNode { return drawn; }

    override view(): ReactNode {
        return null;
    }

    override frame(): ReactNode {
        return null;
    }

    // DI, DECLARED BY THE KIND AND RUN LATE. The composition root calls every
    // $register once each module has resolved, and src/index.ts is emitted — see
    // register.ts. `reflection` must ask `instanceof` against these three and
    // cannot import what imports it, so they are handed over rather than fetched.
    static $register(): void {
        reflection.knows({ writing: $Writing, annotation: $Annotation, type: $Type });
    }
}

export const Type = $($Type);
