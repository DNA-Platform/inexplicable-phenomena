import { ReactNode } from 'react';
import { $, $Block, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, Type } from '@/writing/Writing';
import { Letter } from '@/writing/Letter';
import { Path } from '@/reference/Path';

// A derived kind that is NOT composed and holds no text of its own, told it is a
// Letter. It declares its own bond, because a bond constructor is found by class
// name and is not inherited.
export class $LetterSmiley extends $Writing {
    $at = 0;
    faces = ['\uD83D\uDE42', '\uD83D\uDE00', '\uD83D\uDE0E'];

    override get copy(): string { return this.faces[this.$at]; }

    $LetterSmiley(block: $Block) { super.$Writing(block); }

    turn(): void { this.$at = (this.$at + 1) % this.faces.length; }

    override view(): ReactNode {
        return <span onClick={() => this.turn()}>{this.copy}</span>;
    }
}

export const LetterSmiley = $($LetterSmiley);

// A derived kind of a derived kind, changing only what it draws.
export class $LetterCats extends $LetterSmiley {
    override faces = ['\uD83D\uDE3A', '\uD83D\uDE3C'];

    $LetterCats(block: $Block) { super.$LetterSmiley(block); }
}

export const LetterCats = $($LetterCats);

export class $LetterDerivedSpecSmiley extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Writing>
                    <LetterSmiley />
                    <Type>Letter</Type>
                </Writing>
                <Writing>
                    <LetterCats />
                    <Type>Letter</Type>
                </Writing>
            </>
        );
    }
}

export const LetterDerivedSpecSmiley = $($LetterDerivedSpecSmiley);

// One grapheme, however many code points it takes: composed, decomposed, and a joined family.
export class $LetterGraphemeSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Letter>é</Letter>
                <Letter>é</Letter>
                <Letter>👨‍👩‍👧</Letter>
            </>
        );
    }
}

export const LetterGraphemeSpec = $($LetterGraphemeSpec);

// The five kinds a letter answers with: alphabetical, numeric, whitespace, punctuation, symbolic.
export class $LetterKindSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Letter>a</Letter>
                <Letter>7</Letter>
                <Letter>{' '}</Letter>
                <Letter>,</Letter>
                <Letter>🙂</Letter>
            </>
        );
    }
}

export const LetterKindSpec = $($LetterKindSpec);

// A letter is written as one grapheme of text.
export class $LetterTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Letter>L</Letter>
        );
    }
}

export const LetterTextSpec = $($LetterTextSpec);

// Writing told it is a Letter reads as one, without being written as one.
export class $LetterWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>a<Type>Letter</Type></Writing>
        );
    }
}

export const LetterWritingSpec = $($LetterWritingSpec);

// A reference to a letter stands one meta-level up: writing carrying
// <Type>$Letter</Type> whose path must land on a letter.
export class $LetterReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>letter<Type>$Letter</Type><Path>Lr:0</Path></Writing>
        );
    }
}

export const LetterReferenceSpec = $($LetterReferenceSpec);
