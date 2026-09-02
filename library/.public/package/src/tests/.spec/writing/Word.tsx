import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A canonical word carries a letter or a number; punctuation and whitespace are its residue.
export class $WordKindSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Word>hello</Word>
                <Word>123</Word>
                <Word>!</Word>
            </>
        );
    }
}

export const WordKindSpec = $($WordKindSpec);

// A word written as letters keeps the very objects it was written with.
export class $WordLettersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>
                <Letter>h</Letter>
                <Letter>i</Letter>
            </Word>
        );
    }
}

export const WordLettersSpec = $($WordLettersSpec);

// A written letter stands among divided ones, in written order.
export class $WordMixedSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>a<Letter>🙂</Letter>b</Word>
        );
    }
}

export const WordMixedSpec = $($WordMixedSpec);

// A word written as text divides into its letters, one per grapheme.
export class $WordTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Word>hi</Word>
        );
    }
}

export const WordTextSpec = $($WordTextSpec);

// Writing told it is a Word composes the same letters a written Word does.
export class $WordWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>hi<Type>Word</Type></Writing>
        );
    }
}

export const WordWritingSpec = $($WordWritingSpec);

// A reference to a word stands one meta-level up: writing carrying
// <Type>$Word</Type> whose path must land on a word.
export class $WordReferenceSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>word<Type>$Word</Type><Path>Wd:0</Path></Writing>
        );
    }
}

export const WordReferenceSpec = $($WordReferenceSpec);
