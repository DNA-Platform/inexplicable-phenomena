import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { $, $Block, $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import type { $Type } from '@/notation/Type';
import type { Specification } from '@/notation/Specification';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Title } from '@/writing/Title';
import { $Section } from '@/writing/Section';
import { $Document } from '@/writing/Document';
import { $File } from '@/writing/File';

export const Writing = $($Writing);
export const Letter = $($Letter);
export const Word = $($Word);
export const Sentence = $($Sentence);
export const Paragraph = $($Paragraph);
export const Title = $($Title);
export const Section = $($Section);
export const Document = $($Document);
export const File = $($File);

export const letter = (c: string) => <Letter>{c}</Letter>;
export const word = (...inside: ReactNode[]) => <Word>{inside}</Word>;
export const sentence = (...inside: ReactNode[]) => <Sentence>{inside}</Sentence>;
export const paragraph = (...inside: ReactNode[]) => <Paragraph>{inside}</Paragraph>;
export const title = (...inside: ReactNode[]) => <Title>{inside}</Title>;
export const section = (...inside: ReactNode[]) => <Section>{inside}</Section>;
export const document = (...inside: ReactNode[]) => <Document>{inside}</Document>;
export const file = (...inside: ReactNode[]) => <File>{inside}</File>;

export const built = <T,>(element: ReactNode): T => $(element as never) as T;

export const drawn = (...inside: ReactNode[]): { writing: $Writing; host: HTMLElement } => {
    let kept: $Writing | undefined;
    class $Kept extends $Writing {
        $Kept(block: $Block) { super.$Writing(block); }

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
    const host = window.document.createElement('div');
    act(() => { createRoot(host).render(<Page />); });
    if (!kept)
        throw new Error('nothing was drawn');
    return { writing: kept, host };
};

export const shown = (node: ReactNode): string => {
    const host = window.document.createElement('div');
    act(() => { createRoot(host).render(node); });
    return host.textContent ?? '';
};

export const declares = (kind: { prototype: object }, member: string): boolean =>
    Object.getOwnPropertyNames(kind.prototype).includes(member);

export const chain: Record<string, (copy: string) => ReactNode> = {
    Letter: copy => letter(copy),
    Word: copy => word(letter(copy)),
    Sentence: copy => sentence(word(letter(copy))),
    Paragraph: copy => paragraph(sentence(word(letter(copy)))),
    Title: copy => title(sentence(word(letter(copy)))),
    Section: copy => section(paragraph(sentence(word(letter(copy))))),
    Document: copy => document(section(paragraph(sentence(word(letter(copy))))))
};

// A type's specification is PROTECTED — nothing outside a type consults one, and
// the framework never does. A test still has to see it to promise that a type
// holds ONE, so the reach past `protected` happens here, once, named, rather
// than as a cast at seven call sites.
export const specificationOf = (type: unknown): Specification<$Writing> =>
    (type as { specification: Specification<$Writing> }).specification;
