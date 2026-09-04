import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Path } from '@/reference/Path';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';

// A path IS the url. Its copy is the address and it holds no member for one.
export class $PathTextExample extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Path>/books/algebra</Path>
                <Path>https://example.org/books/algebra#the-correction</Path>
            </>
        );
    }
}

export const PathTextExample = $($PathTextExample);

// A path is writing; its letters here are written, and its copy still reads as a url.
export class $PathLettersExample extends $Chemical {
    view(): ReactNode {
        return (
            <Path>
                <Letter>/</Letter>
                <Letter>a</Letter>
            </Path>
        );
    }
}

export const PathLettersExample = $($PathLettersExample);

// Writing told it is a Path must read as a url, which is a phrase narrowed.
export class $PathWritingExample extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                /books/algebra
                <Type>Path</Type>
            </Writing>
        );
    }
}

export const PathWritingExample = $($PathWritingExample);
