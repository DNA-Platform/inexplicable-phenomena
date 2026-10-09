import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, selection, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, Paragraph, $Annotation, $Format, Format } from '@dna-platform/public';
import type { ElementType } from 'react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');
const styleOf = (writing: $Writing, given: new () => $Format): unknown =>
    (writing.annotations.find(given)[0] as unknown as { style: unknown }).style;
const layersOf = (writing: $Writing): unknown[] => [...writing.containers];

class $Quoted extends $Format {
    style = selection.blockquote`
        border-left: 3px solid silver;
    `;
}

class $Sided extends $Format {
    style = selection.aside`
        font-style: italic;
    `;
}

class $Housed extends $Format {
    themeProvider = true;
    style = selection.section`
        padding: 1rem;
    `;
}

class $Ruled extends $Format {
    $rule?: string;

    style: ElementType = selection.blockquote<{ rule?: string }>`
        border-left: 3px solid ${props => props.rule ?? 'silver'};
    `;

    $Ruled(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        const Rules = this.style;
        this.style = (props: object) => (
            <Rules
                {...props}
                rule={this.$rule}
            />
        );
    }
}

class $Replacing extends $Format {
    style = selection.section`
        padding: 2rem;
    `;

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Format)
                writing.annotations.express(annotation, false);
        super.defines(writing);
    }
}

class $Plain extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Format)
                writing.annotations.express(annotation, false);
    }
}

class $Red extends $Annotation {
    override defines(writing: $Writing): void {
        for (const ruled of writing.annotations.find($Ruled))
            ruled.$rule = 'red';
    }
}

class $Quoting extends $Writing {
    protected override $Define(): void {
        this.annotations.add(this,
            <Quoted />
        );
    }
}

const Quoting = $($Quoting);
const Quoted = $($Quoted);
const Sided = $($Sided);
const Housed = $($Housed);
const Ruled = $($Ruled);
const Replacing = $($Replacing);
const Plain = $($Plain);
const Red = $($Red);

describe('a format hands a styled component over, and a writing carries every format written on it', () => {
    it('holds no style by default, so a bare format adds no layer', () => {
        const writing = built<$Writing>(
            <Writing>
                a <Format />
            </Writing>
        );
        expect([...writing.annotations][0]).toBeInstanceOf($Format);
        expect(layersOf(writing)).toEqual(['span']);
    });

    it('a subclass declares its styled component in the class, and it becomes the outermost layer around the writing\'s own', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Quoted)]);
    });

    it('two writings of one format share one component, and another format makes its own', () => {
        const one = built<$Writing>(
            <Writing>
                a <Quoted />
            </Writing>
        );
        const two = built<$Writing>(
            <Writing>
                b <Quoted />
            </Writing>
        );
        const other = built<$Writing>(
            <Writing>
                c <Sided />
            </Writing>
        );
        expect(styleOf(one, $Quoted)).toBe(styleOf(two, $Quoted));
        expect(styleOf(other, $Sided)).not.toBe(styleOf(one, $Quoted));
    });

    // THE PROVIDER IS FORMAT'S since Sprint 97's policy: a Format that provides stands its provider as the layer, a
    // chemical of Format's own that draws the ThemeProvider and then the style with the theme's declarations inline.
    it('one that themes stands its provider as its layer, which renders the provider and then the style', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Housed />
            </Writing>
        );
        expect(typeof layersOf(writing)[1]).toBe('function');
        expect(layersOf(writing)[1]).not.toBe(styleOf(writing, $Housed));
        expect(typeof styleOf(writing, $Housed)).toBe('object');
    });

    it('every format written on a writing is expressed and stands its own layer, the one in front innermost', () => {
        const writing = built<$Writing>(
            <Writing>
                a <Quoted /><Sided />
            </Writing>
        );
        expect([...writing.annotations][0]).toBeInstanceOf($Sided);
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Sided), styleOf(writing, $Quoted)]);
        expect(writing.is($Quoted)).toBe(true);
        expect(writing.is($Sided)).toBe(true);
    });

    it('drawn, two formats on one writing are two elements, the one in front inside the other, and both rules are in the sheet', async () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted /><Sided />
            </Writing>
        );
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        const quotation = container!.firstElementChild!;
        expect(quotation.tagName).toBe('BLOCKQUOTE');
        expect(quotation.firstElementChild!.tagName).toBe('ASIDE');
        expect(sheet()).toContain('border-left:3px solid silver');
        expect(sheet()).toContain('font-style:italic');
    });

    it('a format meant to replace every other takes the formats behind it out of expression in its own defines', () => {
        const writing = built<$Quoting>(
            <Quoting>
                a quote <Replacing />
            </Quoting>
        );
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Replacing)]);
        expect(writing.is($Quoted)).toBe(false);
    });

    it('takes its layer away when it is not expressed and stands it again when it is, remembering nothing', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Quoted)]);
        writing.$is = Plain;
        writing.view();
        expect(layersOf(writing)).toEqual(['span']);
        writing.$is = [];
        writing.view();
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Quoted)]);
    });

    it('another annotation reaches the format and sets what it draws with', async () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Ruled /><Red />
            </Writing>
        );
        expect(writing.annotations.find($Ruled)[0].$rule).toBe('red');
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(sheet()).toContain('border-left:3px solid red');
    });

    it('drawn, the writing is the styled element and its rules are in the sheet', async () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        const quotation = container!.firstElementChild!;
        expect(quotation.tagName).toBe('BLOCKQUOTE');
        expect(quotation.className).toMatch(/sc-/);
        expect(sheet()).toContain('border-left:3px solid silver');
    });

    it('a class stands its own format in $Define, and one written stands in front of it, both drawn, the written inside', () => {
        const writing = built<$Quoting>(<Quoting>a quote</Quoting>);
        expect(layersOf(writing)[1]).toBe(styleOf(writing, $Quoted));
        const written = built<$Quoting>(
            <Quoting>
                a quote <Sided />
            </Quoting>
        );
        expect(layersOf(written)).toEqual(['span', styleOf(written, $Sided), styleOf(written, $Quoted)]);
        expect(written.is($Quoted)).toBe(true);
    });

    it('each writing carries its own format, so a document is drawn as many elements', async () => {
        const writing = built<$Writing>(
            <Writing>
                <Paragraph>
                    a quote <Quoted />
                </Paragraph>
                <Paragraph>
                    an aside <Sided />
                </Paragraph>
            </Writing>
        );
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect([...container!.querySelectorAll('blockquote,aside')].map(element => element.tagName))
            .toEqual(['BLOCKQUOTE', 'ASIDE']);
    });

    it('taking a format out of expression from outside a define does nothing, since only a define decides expression', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        writing.annotations.express(writing.annotations.find($Quoted)[0], false);
        expect(writing.is($Quoted)).toBe(true);
        writing.view();
        expect(writing.is($Quoted)).toBe(true);
        expect(layersOf(writing)[1]).toBe(styleOf(writing, $Quoted));
    });

    it('registering is idempotent: one layer under its key however many passes run', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        const quoted = writing.annotations.find($Quoted)[0];
        writing.view();
        writing.view();
        expect(layersOf(writing)).toEqual(['span', styleOf(writing, $Quoted)]);
        quoted.erase(writing);
        expect(layersOf(writing)).toEqual(['span']);
    });

    it('a format whose style changes replaces its own layer where it stands, and takes it away when it goes', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        const quoted = writing.annotations.find($Quoted)[0] as unknown as { style: unknown };
        quoted.style = 'article';
        writing.view();
        expect(layersOf(writing)).toEqual(['span', 'article']);
        writing.$is = Plain;
        writing.view();
        expect(layersOf(writing)).toEqual(['span']);
    });

    it('erasing takes back only its own layer, however often, and leaves every other key\'s alone', () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        const quoted = writing.annotations.find($Quoted)[0];
        quoted.erase(writing);
        expect(layersOf(writing)).toEqual(['span']);
        quoted.erase(writing);
        expect(layersOf(writing)).toEqual(['span']);
        writing.containers.add({}, 'article');
        quoted.erase(writing);
        expect(layersOf(writing)).toEqual(['span', 'article']);
    });

    it('a format that never registered has nothing to take back', () => {
        const writing = built<$Writing>(
            <Writing>
                a <Format />
            </Writing>
        );
        const bare = [...writing.annotations][0] as $Format;
        bare.erase(writing);
        expect(layersOf(writing)).toEqual(['span']);
    });

    it('setting the style on a drawn writing redraws it as the new component, which is how an annotation is changed', async () => {
        const writing = built<$Writing>(
            <Writing>
                a quote <Quoted />
            </Writing>
        );
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.tagName).toBe('BLOCKQUOTE');

        const quoted = writing.annotations.find($Quoted)[0] as unknown as { style: unknown };
        const sided = built<$Writing>(
            <Writing>
                x <Sided />
            </Writing>
        );
        await act(async () => { quoted.style = styleOf(sided, $Sided); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.tagName).toBe('ASIDE');
    });
});
