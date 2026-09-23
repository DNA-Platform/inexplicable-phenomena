import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, $Annotation, $Format, Format } from '@dna-platform/public';
import type { ElementType } from 'react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');

const Quotation = styled.blockquote`
    border-left: 3px solid ${(props: any) => props.theme.rule ?? 'silver'};
`;
const Aside = styled.aside`
    font-style: italic;
`;

class $Quoted extends $Format {
    override format: ElementType = Quotation;
}
class $Sided extends $Format {
    override format: ElementType = Aside;
}
class $Plain extends $Annotation {
    override inactivates(writing: $Writing): void {
        for (const format of writing.annotations.find($Format))
            format.enforced = false;
    }
}
const Quoted = $($Quoted);
const Sided = $($Sided);
const Plain = $($Plain);

describe('a format is the annotation that holds a styled component', () => {
    it('holds nothing by default, so a bare format changes nothing', () => {
        const writing = built<$Writing>(<Writing>a <Format /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Format);
        expect(writing.container).toBe('span');
    });

    it('a subclass says which component, and the writing is drawn as it', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        expect(writing.container).toBe(Quotation);
        expect(writing.annotations.at(0)!.container).toBe('span');
    });

    it('gives the element back when it is not expressed, and takes it again when it is', () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /></Writing>);
        writing.annotations.add(Plain);
        writing.view();
        expect(writing.container).toBe('span');
        writing.annotations.remove($Plain);
        writing.view();
        expect(writing.container).toBe(Quotation);
    });

    it('two formats resolve by order, the one furthest back deciding the element', () => {
        const writing = built<$Writing>(<Writing>a <Quoted /><Sided /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Sided);
        expect(writing.container).toBe(Quotation);
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
});
