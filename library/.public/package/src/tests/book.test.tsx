import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Type } from '@/notation/Type';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';
import { $Chapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';
import { $$ } from '@/utilities/Lib';

const Type = $($Type);
const Section = $($Section);
const Chapter = $($Chapter);
const Book = $($Book);
$($File);
$($Document);

const drawn = (...inside: ReactNode[]): $Writing => {
    let kept: $Writing | undefined;
    class $Kept extends $Writing {
        override view(): ReactNode {
            kept = this;
            return super.view();
        }
    }
    const Kept = $($Kept);
    class $Page extends $Chemical {
        view(): ReactNode { return <Kept>{inside}</Kept>; }
    }
    const Page = $($Page);
    act(() => { createRoot(document.createElement('div')).render(<Page />); });
    if (!kept) throw new Error('nothing was drawn');
    return kept;
};

describe('a chapter is a document, and a book is a file of them', () => {
    it('a chapter IS a document', () => {
        const one = $(<Chapter><Section /></Chapter>) as $Chapter;
        expect(one).toBeInstanceOf($Document);
        expect(one.parts().length).toBe(1);
    });

    it('a book IS a file', () => {
        expect($(<Book />) as $Book).toBeInstanceOf($File);
    });

    it('a book composes its chapters', () => {
        const one = $(<Book><Chapter /><Chapter /><Chapter /></Book>) as $Book;
        expect(one.parts().length).toBe(3);
        expect(one.parts().every(part => part instanceof $Chapter)).toBe(true);
    });

    it('and its canonical is the chapter at zero', () => {
        const one = $(<Book><Chapter><Section /></Chapter><Chapter /></Book>) as $Book;
        expect(one.canonical()).toBe(one.parts()[0]);
    });

    it('a chapter answers to Document, because a chapter IS one', () => {
        const one = $(<Chapter />) as $Chapter;
        expect($$(one)($Document)).toBe(true);
        expect($$(one, $Document)).toBe(one);
    });

    it('a book read as a file sees its chapters as documents', () => {
        const one = $(<Book><Chapter /><Chapter /></Book>) as $Book;
        expect($$(one, $File).parts().length).toBe(2);
    });

    it('AND A PIECE OF WRITING BEHAVES AS A BOOK when it carries the type', () => {
        const written = drawn(<Chapter />, <Chapter />, <Type>Book</Type>);
        expect($$(written)($Book)).toBe(true);
        const asBook = $$(written, $Book);
        expect(asBook).toBeInstanceOf($Book);
        expect(asBook.parts().length).toBe(2);
        expect(asBook.parts().every(part => part instanceof $Chapter)).toBe(true);
    });

    it('so a class can BE a book by writing the pattern in its view', () => {
        class $Made extends $Writing {
            override view(): ReactNode {
                return <>{[<Chapter key="a" />, <Chapter key="b" />, <Type key="t">Book</Type>]}</>;
            }
        }
        const Made = $($Made);
        const written = drawn(<Made />);
        expect(written.written.length).toBe(1);
    });
});
