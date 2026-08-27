import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Type } from '@/notation/Type';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';
import { $$ } from '@/utilities/Lib';

const Type = $($Type);
const Letter = $($Letter);
const Section = $($Section);
const Document = $($Document);
const File = $($File);
$($Word);

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

describe('a piece of writing that carries a type BEHAVES as that type', () => {
    it('carries the type it was written with, resolved from the name', () => {
        const written = drawn(<Document />, <Type>File</Type>);
        expect(written.specification.some(one => one instanceof $File)).toBe(true);
    });

    it('IS a file, in the sense of $$, and is not a word', () => {
        const written = drawn(<Document />, <Type>File</Type>);
        expect($$(written)($File)).toBe(true);
        expect($$(written)($Word)).toBe(false);
    });

    it('and read as one, it composes the documents written inside it', () => {
        const written = drawn(<Document />, <Document />, <Type>File</Type>);
        const asFile = $$(written, $File);
        expect(asFile).toBeInstanceOf($File);
        expect(asFile.parts().length).toBe(2);
    });

    it('a written File and a writing that behaves as one answer alike', () => {
        const direct = $(<File><Document /><Document /></File>) as $File;
        const behaving = $$(drawn(<Document />, <Document />, <Type>File</Type>), $File);
        expect(behaving.parts().length).toBe(direct.parts().length);
    });

    it('the same shape at word grade, with letters', () => {
        const behaving = $$(drawn(<Letter>h</Letter>, <Letter>i</Letter>, <Type>Word</Type>), $Word);
        expect(behaving.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and it reaches down a real ladder', () => {
        const written = drawn(<Section />, <Type>Document</Type>);
        expect($$(written, $Document).parts().length).toBe(1);
    });
});
