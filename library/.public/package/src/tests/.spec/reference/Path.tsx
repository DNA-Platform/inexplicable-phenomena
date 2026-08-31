import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Path } from '@/reference/Path';
import { Letter } from '@/writing/Letter';
import { Writing, Type } from '@/writing/Writing';

// A path IS the url. Its copy is the address and it holds no member for one.
export class $PathTextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <>
                <Path>/books/algebra</Path>
                <Path>https://example.org/books/algebra#the-correction</Path>
            </>
        );
    }
}

export const PathTextSpec = $($PathTextSpec);

// A path is a phrase, so it composes letters and may be written as them.
export class $PathLettersSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Path>
                <Letter>/</Letter>
                <Letter>a</Letter>
            </Path>
        );
    }
}

export const PathLettersSpec = $($PathLettersSpec);

// Writing told it is a Path must read as a url, which is a phrase narrowed.
export class $PathWritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>/books/algebra<Type>Path</Type></Writing>
        );
    }
}

export const PathWritingSpec = $($PathWritingSpec);
