import { afterEach } from 'vitest';
import { ReactNode, act } from 'react';
import { createRoot } from 'react-dom/client';
import { $, $Block, $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import type { $Type } from '@/writing/Writing';
import type { Specification } from '@/utilities/Specification';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Heading } from '@/writing/Heading';
import { $Section } from '@/writing/Section';
import { $Chapter } from '@/book/Chapter';
import { $Book } from '@/book/Book';

export const Writing = $($Writing);
export const Letter = $($Letter);
export const Word = $($Word);
export const Sentence = $($Sentence);
export const Paragraph = $($Paragraph);
export const Heading = $($Heading);
export const Section = $($Section);
export const Chapter = $($Chapter);
export const Book = $($Book);

export const letter = (c: string) => <Letter>{c}</Letter>;
export const word = (...inside: ReactNode[]) => <Word>{inside}</Word>;
export const sentence = (...inside: ReactNode[]) => <Sentence>{inside}</Sentence>;
export const paragraph = (...inside: ReactNode[]) => <Paragraph>{inside}</Paragraph>;
export const heading = (...inside: ReactNode[]) => <Heading>{inside}</Heading>;
export const section = (...inside: ReactNode[]) => <Section>{inside}</Section>;
export const chapter = (...inside: ReactNode[]) => <Chapter>{inside}</Chapter>;
export const book = (...inside: ReactNode[]) => <Book>{inside}</Book>;

export const built = <T,>(element: ReactNode): T => $(element as never) as T;

const roots: { unmount(): void }[] = [];

afterEach(() => {
    for (const root of roots.splice(0)) act(() => { root.unmount(); });
});

export const mounted = (node: ReactNode): HTMLElement => {
    const host = window.document.createElement('div');
    const root = createRoot(host);
    roots.push(root);
    act(() => { root.render(node); });
    return host;
};

export const drawn = (...inside: ReactNode[]): { writing: $Composition; host: HTMLElement } => {
    let kept: $Composition | undefined;
    class $Kept extends $Composition {
        $Kept(block: $Block) { super.$Composition(block); }

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
    const host = mounted(<Page />);
    if (!kept)
        throw new Error('nothing was drawn');
    return { writing: kept, host };
};

export const shown = (node: ReactNode): string => mounted(node).textContent ?? '';

export const declares = (kind: { prototype: object }, member: string): boolean =>
    Object.getOwnPropertyNames(kind.prototype).includes(member);

export const chain: Record<string, (copy: string) => ReactNode> = {
    Letter: copy => letter(copy),
    Word: copy => word(letter(copy)),
    Sentence: copy => sentence(word(letter(copy))),
    Paragraph: copy => paragraph(sentence(word(letter(copy)))),
    Heading: copy => heading(sentence(word(letter(copy)))),
    Section: copy => section(heading(sentence(word(letter('T')))), paragraph(sentence(word(letter(copy))))),
    Chapter: copy => chapter(section(heading(sentence(word(letter('T')))), paragraph(sentence(word(letter(copy))))))
};

// A type's specification is PROTECTED — nothing outside a type consults one, and
// the framework never does. A test still has to see it to promise that a type
// holds ONE, so the reach past `protected` happens here, once, named, rather
// than as a cast at seven call sites.
export const specificationOf = (type: unknown): Specification<$Writing> =>
    (type as { specification: Specification<$Writing> }).specification;
