import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation } from '@dna-platform/public';
import type { ElementType, ReactNode } from 'react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const Quotation = styled.blockquote`
    border-left: 3px solid ${(props: any) => props.theme.rule ?? 'silver'};
`;

class $Format extends $Annotation {
    format: ElementType = 'span';
    protected _lent?: ElementType;
    override defines(writing: $Writing): void {
        if (writing.container === this.format) return;
        this._lent = writing.container;
        writing.container = this.format;
    }
    override erase(writing: $Writing): void {
        if (this._lent === undefined) return;
        writing.container = this._lent;
        this._lent = undefined;
    }
}
class $Quoted extends $Format {
    override format: ElementType = Quotation;
}

class $Wrapping extends $Annotation {
    values: object = {};
    protected _inner?: ElementType;
    protected _provider?: ElementType;
    override defines(writing: $Writing): void {
        if (writing.container === this._provider) return;
        const Inner = this._inner = writing.container;
        const values = this.values;
        this._provider = ({ children, ...props }: { children?: ReactNode }) => (
            <ThemeProvider theme={values}>
                <Inner {...props}>{children}</Inner>
            </ThemeProvider>
        );
        writing.container = this._provider;
    }
    override erase(writing: $Writing): void {
        if (this._inner === undefined) return;
        writing.container = this._inner;
        this._inner = undefined;
        this._provider = undefined;
    }
}
class $WrappingRed extends $Wrapping {
    override values = { rule: 'red' };
}

class $Themed extends $Writing {
    theme?: object;
    override view(): ReactNode {
        const drawn = super.view();
        const theme = this.theme;
        return theme === undefined ? drawn : <ThemeProvider theme={() => theme}>{drawn}</ThemeProvider>;
    }
}
class $Theme extends $Annotation {
    rule = 'silver';
    override defines(writing: $Writing): void {
        if (writing instanceof $Themed) writing.theme = this;
    }
    override erase(writing: $Writing): void {
        if (writing instanceof $Themed && writing.theme === this) writing.theme = undefined;
    }
}
class $Blue extends $Theme {
    override rule = 'blue';
}

const Quoted = $($Quoted);
const WrappingRed = $($WrappingRed);
const Themed = $($Themed);
const Blue = $($Blue);

const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');

const drawn = async (element: React.ReactElement): Promise<HTMLElement> => {
    let container: HTMLElement | undefined;
    await act(async () => { container = render(element).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

describe('Format, tried: an annotation holding its styled component on a property, lent to the writing it annotates', () => {
    it('lends its format as the container in defines and gives the container back in erase; a subclass overrides the property', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        expect(writing.container).toBe(Quotation);
        expect(writing.annotations.at(0)!.container).toBe('span');
        writing.annotations.at(0)!.enforced = false;
        writing.view();
        expect(writing.container).toBe('span');
    });

    it('draws the writing as the styled element, with its rule in the sheet', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        const Drawn = $(writing);
        const container = await drawn(<Drawn />);
        const quotation = container.firstElementChild!;
        expect(quotation.tagName).toBe('BLOCKQUOTE');
        expect(quotation.className).toMatch(/sc-/);
        expect(sheet()).toContain('border-left:3px solid silver');
    });
});

describe('Theme, tried two ways: a provider wrapped around the container, and the writing placing styled-components\' provider around what it draws', () => {
    it('wrapping the container: two annotations on one surface break each other\'s idempotence, so a pass remakes the wrapper, a Format behind undoes it, and a render loops', () => {
        const ordered = built<$Writing>(<Writing>a quote <WrappingRed /><Quoted /></Writing>);
        const provider = ordered.container;
        expect(provider).not.toBe(Quotation);
        ordered.view();
        expect(ordered.container).not.toBe(provider);
        const reversed = built<$Writing>(<Writing>a quote <Quoted /><WrappingRed /></Writing>);
        expect(reversed.container).toBe(Quotation);
        const given = built<$Writing>(<Writing is={WrappingRed}>a quote <Quoted /></Writing>);
        expect(given.container).toBe(Quotation);
    });

    it('the writing\'s own provider: a theme an annotation set is provided around the drawing, the container untouched, and un-enforcing the Theme redraws without it', async () => {
        const writing = built<$Themed>(<Themed>a quote <Quoted /><Blue /></Themed>);
        expect(writing.container).toBe(Quotation);
        expect(writing.theme).toBeInstanceOf($Blue);
        const Drawn = $(writing);
        const container = await drawn(<Drawn />);
        expect(container.firstElementChild!.tagName).toBe('BLOCKQUOTE');
        expect(sheet()).toContain('border-left:3px solid blue');
        const was = container.firstElementChild!.className;
        await act(async () => { writing.annotations.at(0)!.enforced = false; });
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        expect(container.firstElementChild!.className).not.toBe(was);
        expect(writing.theme).toBeUndefined();
    });

    it('the writing\'s own provider does not care in what order Format and Theme act, $is included', () => {
        for (const themed of [
            built<$Themed>(<Themed>a <Blue /><Quoted /></Themed>),
            built<$Themed>(<Themed>a <Quoted /><Blue /></Themed>),
            built<$Themed>(<Themed is={Blue}>a <Quoted /></Themed>),
        ]) {
            expect(themed.container).toBe(Quotation);
            expect(themed.theme).toBeInstanceOf($Blue);
        }
    });
});
