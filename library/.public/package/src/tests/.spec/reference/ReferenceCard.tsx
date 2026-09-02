import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { ReferenceCard } from '@/reference/ReferenceCard';
import { Reference } from '@/reference/Reference';
import { Path } from '@/reference/Path';
import { Letter } from '@/writing/Letter';
import { Word } from '@/writing/Word';
import { Writing, Type, Trait } from '@/writing/Writing';

// A card is a list of references whose FIRST is the canonical: the card wears
// its first's path, reads as its first reads, and exposes the rest.
export class $ReferenceCardListSpec extends $Chemical {
    view(): ReactNode {
        return (
            <ReferenceCard><Reference><Word><Letter>h</Letter><Letter>i</Letter></Word><Path>Wd:0</Path></Reference><Reference>beta<Path>Se:1</Path></Reference></ReferenceCard>
        );
    }
}

export const ReferenceCardListSpec = $($ReferenceCardListSpec);

// Card-hood arrives as a TRAIT: writing that is a reference — here by carrying
// the type — wears <Trait>Card</Trait> and stands as a card, its own path the
// canonical's, without deriving from $ReferenceCard.
export class $ReferenceCardTraitSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>algebra<Type>Reference</Type><Trait>Card</Trait><Path>Wd:0</Path><Reference>beta<Path>Se:1</Path></Reference></Writing>
        );
    }
}

export const ReferenceCardTraitSpec = $($ReferenceCardTraitSpec);
