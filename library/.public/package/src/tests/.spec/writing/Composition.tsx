import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Composition } from '@/writing/Composition';
import { TypeOfSentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// The machinery seat made writing: a bare composition carries no type and may
// not be specified; configured with a type, it behaves as that level and
// composes what the level composes.
export class $CompositionConfiguredExample extends $Chemical {
    view(): ReactNode {
        return (
            <Composition>
                <TypeOfSentence />
                <Word>hi</Word>
                <Word>yo</Word>
            </Composition>
        );
    }
}

export const CompositionConfiguredExample = $($CompositionConfiguredExample);
