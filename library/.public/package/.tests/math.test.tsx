import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Sentence, Sentence, $Paragraph, Paragraph, Word, $Math, Math, $Equation, Equation, binder } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, Cover, Title, Section, Heading } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const typesetter = (tex: string, display: boolean): string => `<i data-display="${display}">${tex}</i>`;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

// Doug, 2026-09-30: "List and Math are fundamental… along with the Math components that we had in the last version,
// adapted." Math is a Word whose text is TeX drawn inline; Equation a Paragraph drawn in display mode and numbered by
// the sheet's counter; both typeset through a typesetter prop defaulting to KaTeX, as Code highlights through its
// highlighter, and the marks pd-math and pd-equation by the pattern he chose.
describe('math is a word whose text is TeX, typeset inline', () => {
    it('is a word at 2, its TeX what was written in it, drawn as KaTeX\'s inline markup inside its own element', async () => {
        const math = built<$Math>(<Math>{'E = mc^2'}</Math>);
        expect(math.level).toBe(2);
        expect(math.tex).toBe('E = mc^2');
        expect([...math.classes]).toEqual(expect.arrayContaining(['pd-word', 'pd-math']));
        const page = await drawn(math);
        const own = page.querySelector('.pd-math')!;
        expect(own.querySelector('.katex')).not.toBeNull();
        expect(own.querySelector('.katex-display')).toBeNull();
        expect(own.textContent).toContain('E');
    });

    it('stands in a sentence as a word does, a part of it', () => {
        const sentence = built<$Sentence>(
            <Sentence>
                Einstein wrote <Math>{'E = mc^2'}</Math> and stopped.
            </Sentence>
        );
        expect(sentence.parts).toHaveLength(1);
        expect(sentence.parts[0]).toBeInstanceOf($Math);
    });

    it('typesets through its typesetter, a prop, so a stub draws the stub\'s markup', async () => {
        const math = built<$Math>(<Math typesetter={typesetter}>{'x'}</Math>);
        const page = await drawn(math);
        expect(page.querySelector('.pd-math i')?.getAttribute('data-display')).toBe('false');
        expect(page.querySelector('.pd-math i')?.textContent).toBe('x');
    });
});

describe('an equation is a paragraph of TeX, typeset in display mode and numbered by the sheet', () => {
    it('is a paragraph at 4, drawn as KaTeX\'s display markup inside its own element', async () => {
        const equation = built<$Equation>(<Equation>{'\\int_0^1 x \\, dx = \\frac{1}{2}'}</Equation>);
        expect(equation.level).toBe(4);
        expect(equation.tex).toBe('\\int_0^1 x \\, dx = \\frac{1}{2}');
        expect([...equation.classes]).toEqual(expect.arrayContaining(['pd-paragraph', 'pd-equation']));
        const page = await drawn(equation);
        expect(page.querySelector('.pd-equation .katex-display')).not.toBeNull();
    });

    it('typesets through its typesetter in display mode', async () => {
        const equation = built<$Equation>(<Equation typesetter={typesetter}>{'y'}</Equation>);
        const page = await drawn(equation);
        expect(page.querySelector('.pd-equation i')?.getAttribute('data-display')).toBe('true');
    });

    // NUMBERED BY A LIBRARY'S COUNTER since Sprint 97's policy: the base marks an equation and says nothing of its look;
    // a library's theme counts pd-equation and draws the number, as it counts chapters.
    it('drawn in its book, is marked pd-equation and pd-math and the base numbers nothing', async () => {
        const page = await drawn(built<$Book>(
            <Book>
                <Chapter>
                    <Cover />
                    <Title>[A Paper](/a-paper/)</Title>
                </Chapter>
                <Chapter>
                    <Title>[The Evidence](/a-paper/the-evidence/)</Title>
                    <Section>
                        <Heading>h</Heading>
                        <Paragraph>
                            So <Math>{'a^2'}</Math>.
                        </Paragraph>
                        <Equation>{'a^2 + b^2 = c^2'}</Equation>
                    </Section>
                </Chapter>
            </Book>
        ));
        expect(page.querySelector('.pd-equation')).not.toBeNull();
        expect(page.querySelector('.pd-math')).not.toBeNull();
        const sheet = document.head.innerHTML;
        expect(sheet).not.toMatch(/counter-increment:\s*equation/u);
        expect(sheet).not.toMatch(/\.pd-equation::after/u);
    });
});

describe('the sheets the package needs are the binder\'s to link', () => {
    it('names KaTeX\'s stylesheet on the binder, the package\'s seam toward the compiler, and the class needs no other', () => {
        expect(binder.stylesheets).toEqual(['katex/dist/katex.min.css']);
        const source = readFileSync(join(process.cwd(), 'src/writing/Math.tsx'), 'utf8');
        expect(source).not.toContain('.css');
    });
});
