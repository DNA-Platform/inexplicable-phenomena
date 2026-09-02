import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Trait, $Writing, Writing, Type, Trait } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';

// An ATTRIBUTE is named and resolved the way a type is, and it specifies — but
// nothing is bound through it, so a piece of writing keeps the one type it has
// and may carry as many attributes as it likes.
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

export class $TraitDeclaredSpecFriend extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>Doug<Trait>TraitFriend</Trait><Type>Phrase</Type></Writing>
        );
    }
}

export const TraitDeclaredSpecFriend = $($TraitDeclaredSpecFriend);
