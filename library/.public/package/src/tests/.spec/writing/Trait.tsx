import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Trait, $Writing, Writing, Type, Trait } from '@/writing/Writing';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Specification, specify } from '@/utilities/Specification';

// A trait is named and resolved the way a type is, and it specifies — but
// nothing is bound through it, so a piece of writing keeps the one type it has
// and may wear as many traits as it likes.
export class TraitFriendSpecification extends Specification<$Writing> {
    @specify('a friend is named')
    $mustBeNamed(writing: $Writing): void {
        $check(writing.copy.trim() !== '', 'a friend is named, and this one says nothing');
    }
}

export class $TraitFriend extends $Trait {
    constructor() {
        super();
        this[cache]('TraitFriend');
    }

    protected override specification: Specification<$Writing> = new TraitFriendSpecification();
}

$($TraitFriend);

// A declared trait carries laws: this writing is specified by its type AND by
// the friend it wears.
export class $TraitDeclaredFriendExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>Doug<Trait>TraitFriend</Trait><Type>Phrase</Type></Writing>
        );
    }
}

export const TraitDeclaredFriendExample = $($TraitDeclaredFriendExample);

// A pure trait needs no class at all. The written word is the label, the frame
// wears it, and a stylesheet may dress it — glowing is not in the framework,
// which is the point.
export class $TraitPureExample extends $Chemical {
    view(): ReactNode {
        return (
            <Sentence>
                it shines
                <Trait>Glowing</Trait>
            </Sentence>
        );
    }
}

export const TraitPureExample = $($TraitPureExample);
