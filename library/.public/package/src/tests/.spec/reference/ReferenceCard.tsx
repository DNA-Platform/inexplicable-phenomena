import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { ReferenceCard } from '@/reference/ReferenceCard';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';
import { Letter } from '@/writing/Letter';
import { Word } from '@/writing/Word';
import { Writing, Type } from '@/writing/Writing';

// A card is a list of references whose FIRST is the canonical: the card wears
// its first's path, reads as its first reads, and exposes the rest.
export class $ReferenceCardListExample extends $Chemical {
    view(): ReactNode {
        return (
            <ReferenceCard>
                <Reference>
                    <Word>hi</Word>
                    <Path>Wd:0</Path>
                </Reference>
                <Reference>
                    beta
                    <Path>Se:1</Path>
                </Reference>
            </ReferenceCard>
        );
    }
}

export const ReferenceCardListExample = $($ReferenceCardListExample);

// Card-hood arrives as a TRAIT: writing that is a reference — here by carrying
// the type — wears <Type>Card</Type> and stands as a card, its own path the
// canonical's, without deriving from $ReferenceCard.
export class $ReferenceCardTraitExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>algebra<Type>Reference</Type><Type>Card</Type><Path>Wd:0</Path><Reference>beta<Path>Se:1</Path></Reference></Writing>
        );
    }
}

export const ReferenceCardTraitExample = $($ReferenceCardTraitExample);
