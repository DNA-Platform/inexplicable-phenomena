import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Word } from '@/writing/Word';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';
import { Path } from '@/reference/Path';

// A canonical word carries a letter or a number; punctuation and whitespace are
// its residue.
export class $WordKindExample extends $Chemical {
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

export const WordKindExample = $($WordKindExample);

// A word written as letters keeps the very objects it was written with.
export class $WordLettersExample extends $Chemical {
    view(): ReactNode {
        return (
            <Word>
                <Letter>h</Letter>
                <Letter>i</Letter>
            </Word>
        );
    }
}

export const WordLettersExample = $($WordLettersExample);

// A word inside a word contributes its letters.
export class $WordNestedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Word>
                <Word>in</Word>
                <Word>side</Word>
            </Word>
        );
    }
}

export const WordNestedExample = $($WordNestedExample);

// A written letter stands among divided ones, in written order.
export class $WordMixedExample extends $Chemical {
    view(): ReactNode {
        return (
            <Word>a<Letter>🙂</Letter>b</Word>
        );
    }
}

export const WordMixedExample = $($WordMixedExample);

// A word written as text divides into its letters, one per grapheme.
export class $WordTextExample extends $Chemical {
    view(): ReactNode {
        return (
            <Word>hi</Word>
        );
    }
}

export const WordTextExample = $($WordTextExample);

// Writing told it is a Word composes the same letters a written Word does.
export class $WordWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>hi<Type>Word</Type></Writing>
        );
    }
}

export const WordWritingExample = $($WordWritingExample);

// A reference to a word stands one meta-level up: writing carrying the $Word
// type whose path must land on a word.
export class $WordReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>word<Type>$Word</Type><Path>Wd:0</Path></Writing>
        );
    }
}

export const WordReferenceExample = $($WordReferenceExample);
