import { ReactNode } from 'react';
import { $, $Block, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing } from '@/writing/Writing';
import { Type } from '@/notation/Type';

// A derived kind that is NOT composed and holds no text of its own, told it is a
// Letter. It declares its own bond, because a bond constructor is found by class
// name and is not inherited.
export class $Smiley extends $Writing {
    $at = 0;
    faces = ['\uD83D\uDE42', '\uD83D\uDE00', '\uD83D\uDE0E'];

    override get copy(): string { return this.faces[this.$at]; }

    $Smiley(block: $Block) { super.$Writing(block); }

    turn(): void { this.$at = (this.$at + 1) % this.faces.length; }

    override view(): ReactNode {
        return <span onClick={() => this.turn()}>{this.copy}</span>;
    }
}

export const Smiley = $($Smiley);

// A derived kind of a derived kind, changing only what it draws.
export class $Cats extends $Smiley {
    override faces = ['\uD83D\uDE3A', '\uD83D\uDE3C'];

    $Cats(block: $Block) { super.$Smiley(block); }
}

export const Cats = $($Cats);

export class $DerivedSpecSmiley extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Writing>
                    <Smiley />
                    <Type>Letter</Type>
                </Writing>
                <Writing>
                    <Cats />
                    <Type>Letter</Type>
                </Writing>
            </>
        );
    }
}

export const DerivedSpecSmiley = $($DerivedSpecSmiley);
