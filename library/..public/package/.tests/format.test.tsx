import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, styled, $Chemical } from '@dna-platform/chemistry';
import { $Writing, Writing, Paragraph, $Annotation, $Format, Format } from '@dna-platform/public';
import type { ElementType } from 'react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');
const styleOf = (writing: $Writing, given: new () => $Format): unknown =>
    (writing.annotations.find(given)[0] as unknown as { style: unknown }).style;

class $Quoted extends $Format {
    style = styled.blockquote`
        border-left: 3px solid silver;
    `;
}

class $Sided extends $Format {
    style = styled.aside`
        font-style: italic;
    `;
}

class $Housed extends $Format {
    theme = true;
    style = styled.section`
        padding: 1rem;
    `;
}

class $Ruled extends $Format {
    $rule?: string;

    style: ElementType = styled.blockquote<{ rule?: string }>`
        border-left: 3px solid ${props => props.rule ?? 'silver'};
    `;

    $Ruled(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        const Rules = this.style;
        this.style = (props: object) => <Rules {...props} rule={this.$rule} />;
    }
}

class $Plain extends $Annotation {
    override defines(writing: $Writing): void {
        for (const format of writing.annotations.find($Format))
            format.express(false);
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
        this.annotations.add(<Quoted />);
    }
}

const Quoting = $($Quoting);
const Quoted = $($Quoted);
const Sided = $($Sided);
const Housed = $($Housed);
const Ruled = $($Ruled);
const Plain = $($Plain);
const Red = $($Red);

describe('a format hands a styled component over, and a writing has one format', () => {
    it('holds no style by default, so a bare format changes nothing', () => {
        const writing = built<$Writing>(<Writing>a <Format /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Format);
        expect(writing.container).toBe('span');
    });

    it('a subclass declares its styled component in the class, and the writing is drawn as it', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        expect(writing.container).toBe(styleOf(writing, $Quoted));
    });

    it('two writings of one format share one component, and another format makes its own', () => {
        const one = built<$Writing>(<Writing>a <Quoted /></Writing>);
        const two = built<$Writing>(<Writing>b <Quoted /></Writing>);
        const other = built<$Writing>(<Writing>c <Sided /></Writing>);
        expect(styleOf(one, $Quoted)).toBe(styleOf(two, $Quoted));
        expect(styleOf(other, $Sided)).not.toBe(styleOf(one, $Quoted));
    });

    it('one that themes is drawn as its own wrapper, which renders the provider and then the style', () => {
        const writing = built<$Writing>(<Writing>a quote <Housed /></Writing>);
        expect(typeof writing.container).toBe('function');
        expect(writing.container).toBe(styleOf(writing, $Housed));
    });

    it('every format unexpresses every other, whatever its kind, so the one in front decides', () => {
        const writing = built<$Writing>(<Writing>a <Quoted /><Sided /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Sided);
        expect(writing.container).toBe(styleOf(writing, $Sided));
        expect(writing.annotations.find($Quoted)[0].expressed).toBe(false);
    });

    it('keeps the writing\'s own component in its envelope and puts it back when it is not expressed', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        expect(writing.container).not.toBe('span');
        writing.$is = Plain;
        writing.view();
        expect(writing.container).toBe('span');
        writing.$is = [];
        writing.view();
        expect(writing.container).toBe(styleOf(writing, $Quoted));
    });

    it('another annotation reaches the format and sets what it draws with', async () => {
        const writing = built<$Writing>(<Writing>a quote <Ruled /><Red /></Writing>);
        expect(writing.annotations.find($Ruled)[0].$rule).toBe('red');
        const Drawn = $(writing);
        await act(async () => { render(<Drawn />); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(sheet()).toContain('border-left:3px solid red');
    });

    it('drawn, the writing is the styled element and its rules are in the sheet', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        const quotation = container!.firstElementChild!;
        expect(quotation.tagName).toBe('BLOCKQUOTE');
        expect(quotation.className).toMatch(/sc-/);
        expect(sheet()).toContain('border-left:3px solid silver');
    });

    it('a class stands its own format in $Define, and one written stands in front of it', () => {
        const writing = built<$Quoting>(<Quoting>a quote</Quoting>);
        expect(writing.container).toBe(styleOf(writing, $Quoted));
        const written = built<$Quoting>(<Quoting>a quote <Sided /></Quoting>);
        expect(written.container).toBe(styleOf(written, $Sided));
        expect(written.annotations.find($Quoted)[0].expressed).toBe(false);
    });

    it('each writing carries its own format, so a document is drawn as many elements', async () => {
        const writing = built<$Writing>(
            <Writing>
                <Paragraph>a quote <Quoted /></Paragraph>
                <Paragraph>an aside <Sided /></Paragraph>
            </Writing>
        );
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect([...container!.querySelectorAll('blockquote,aside')].map(element => element.tagName))
            .toEqual(['BLOCKQUOTE', 'ASIDE']);
    });

    it('taking a format out of expression from outside does not survive the next pass, since expression is computed', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        writing.annotations.find($Quoted)[0].express(false);
        expect(writing.annotations.find($Quoted)[0].expressed).toBe(false);
        writing.view();
        expect(writing.annotations.find($Quoted)[0].expressed).toBe(true);
        expect(writing.container).toBe(styleOf(writing, $Quoted));
    });

    it('applying is idempotent: the writing is drawn as the style however many passes run, and one envelope is held', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const quoted = writing.annotations.find($Quoted)[0];
        const style = styleOf(writing, $Quoted);
        writing.view();
        writing.view();
        expect(writing.container).toBe(style);
        quoted.express(false);
        quoted.erase(writing);
        expect(writing.container).toBe('span');
    });

    it('a format whose style changes while it is applied still gives the writing its own back', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const quoted = writing.annotations.find($Quoted)[0] as unknown as { style: unknown };
        expect(writing.container).not.toBe('span');
        quoted.style = 'article';
        writing.view();
        expect(writing.container).toBe('article');
        writing.$is = Plain;
        writing.view();
        expect(writing.container).toBe('span');
    });

    it('erasing is idempotent, and a format that does not find its own style leaves the container alone', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const quoted = writing.annotations.find($Quoted)[0];
        quoted.erase(writing);
        expect(writing.container).toBe('span');
        quoted.erase(writing);
        expect(writing.container).toBe('span');
        writing.container = 'article';
        quoted.erase(writing);
        expect(writing.container).toBe('article');
    });

    it('a format that never applied has nothing to give back', () => {
        const writing = built<$Writing>(<Writing>a <Format /></Writing>);
        const bare = writing.annotations.at(0) as $Format;
        bare.erase(writing);
        expect(writing.container).toBe('span');
    });

    it('setting the style on a drawn writing redraws it as the new component, which is how an annotation is changed', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const Drawn = $(writing);
        let container: HTMLElement | undefined;
        await act(async () => { container = render(<Drawn />).container; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.tagName).toBe('BLOCKQUOTE');

        const quoted = writing.annotations.find($Quoted)[0] as unknown as { style: unknown };
        await act(async () => { quoted.style = styleOf(built<$Writing>(<Writing>x <Sided /></Writing>), $Sided); });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container?.firstElementChild?.tagName).toBe('ASIDE');
    });
});
