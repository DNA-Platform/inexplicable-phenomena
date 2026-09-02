import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Composition } from '@/writing/Composition';
import { TypeOfSentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';

// The machinery seat made writing: a bare composition carries no type and may
// not be specified; configured with a type, it behaves as that level and
// composes what the level composes.
export class $CompositionConfiguredSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Composition>
                <TypeOfSentence />
                <Word><Letter>h</Letter><Letter>i</Letter></Word>
                {' '}
                <Word><Letter>y</Letter><Letter>o</Letter></Word>
            </Composition>
        );
    }
}

export const CompositionConfiguredSpec = $($CompositionConfiguredSpec);
