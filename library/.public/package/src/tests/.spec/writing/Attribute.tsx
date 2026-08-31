import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Attribute, $Writing, Writing, Type, Attribute } from '@/writing/Writing';
import { Specification, specify } from '@/utilities/Specification';

// An ATTRIBUTE is named and resolved the way a type is, and it specifies — but
// nothing is bound through it, so a piece of writing keeps the one type it has
// and may carry as many attributes as it likes.
export class AttributeFriendSpecification extends Specification<$Writing> {
    @specify('a friend is named')
    $mustBeNamed(writing: $Writing): void {
        $check(writing.copy.trim() !== '', 'a friend is named, and this one says nothing');
    }
}

export class $AttributeFriend extends $Attribute {
    constructor() {
        super();
        this[cache]('AttributeFriend');
    }

    protected override specification: Specification<$Writing> = new AttributeFriendSpecification();
}

$($AttributeFriend);

export class $AttributeDeclaredSpecFriend extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>Doug<Attribute>AttributeFriend</Attribute><Type>Phrase</Type></Writing>
        );
    }
}

export const AttributeDeclaredSpecFriend = $($AttributeDeclaredSpecFriend);
