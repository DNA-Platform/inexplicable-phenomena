import { ReactNode } from 'react';
import { $, $Chemical, $check, cache } from '@dna-platform/chemistry';
import { $Type, $Writing, Writing, Type } from '@/writing/Writing';
import { Sentence } from '@/writing/Sentence';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Specification, specify } from '@/utilities/Specification';

// A piece of writing carries as many types as it likes. One of them is the
// canonical type — the level it is read as — and the rest label it. Every type
// is a class, so a name nothing declares stops the build rather than standing
// as a word nobody checked.
export class LabelFriendSpecification extends Specification<$Writing> {
    @specify('a friend is named')
    $mustBeNamed(writing: $Writing): void {
        $check(writing.copy.trim() !== '', 'a friend is named, and this one says nothing');
    }
}

export class $LabelFriend extends $Type {
    override name = 'Friend';
    override resolve = false;

    constructor() {
        super();
        this[cache]('Friend');
    }

    protected override specification: Specification<$Writing> = new LabelFriendSpecification();
}

$($LabelFriend);

// A label that carries laws: this writing is specified by the level it is read
// as AND by the friend it is labelled with. Both weigh in.
export class $LabelDeclaredExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>Doug<Type>Friend</Type><Type>Phrase</Type></Writing>
        );
    }
}

export const LabelDeclaredExample = $($LabelDeclaredExample);

// A label with no laws of its own is still a class, and the class may be empty.
// The written word is what dresses the frame; glowing is not in the framework,
// which is the point.
export class $Glowing extends $Type {
    override name = 'Glowing';
    override resolve = false;

    constructor() {
        super();
        this[cache]('Glowing');
    }
}

$($Glowing);

export class $LabelEmptyExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                it shines
                <Type>Glowing</Type>
                <Type>Sentence</Type>
            </Writing>
        );
    }
}

export const LabelEmptyExample = $($LabelEmptyExample);
