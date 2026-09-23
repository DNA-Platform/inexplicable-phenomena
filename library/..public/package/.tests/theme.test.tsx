import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, Paragraph, $Annotation, $Format, $Theme, Theme, ThemeSpecification } from '@dna-platform/public';
import type { ElementType } from 'react';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const settled = async (): Promise<void> => {
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
};

const Quotation = styled.blockquote`
    border-left: 3px solid ${(props: any) => props.theme.rule ?? 'silver'};
    color: ${(props: any) => props.theme.ink ?? 'black'};
`;
const Sheet = styled.div`
    padding: 1rem;
`;

class $Quoted extends $Format {
    override format: ElementType = Quotation;
}
class $Ruled extends $Theme {
    override values = { rule: 'blue', ink: 'navy' };
}
class $Inked extends $Theme {
    override values = { ink: 'green' };
}
class $Housed extends $Theme {
    override values = { rule: 'teal' };
    override format: ElementType = Sheet;
}
class $Unthemed extends $Annotation {
    override inactivates(writing: $Writing): void {
        for (const theme of writing.annotations.find($Theme))
            theme.enforced = false;
    }
}
const Quoted = $($Quoted);
const Ruled = $($Ruled);
const Inked = $($Inked);
const Housed = $($Housed);
const Unthemed = $($Unthemed);

describe('a theme is a format that also provides its values to everything the writing rendered', () => {
    it('is a format, so it is found among them, and holds no component of its own by default', () => {
        const writing = built<$Writing>(<Writing>a <Ruled /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Format);
        expect(writing.is(Theme)).toBe(true);
        expect(writing.container).toBe('span');
    });

    it('provides its values to the writing\'s own element, since a review goes around the whole container', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /><Ruled /></Writing>);
        expect(writing.container).toBe(Quotation);
        const container = await drawn(writing);
        expect(container.firstElementChild!.tagName).toBe('BLOCKQUOTE');
        expect(sheet()).toContain('border-left:3px solid blue;color:navy');
    });

    it('provides to what the writing holds, which is the enclave a composition gives', async () => {
        const writing = built<$Writing>(<Writing><Paragraph>a quote <Quoted /></Paragraph><Ruled /></Writing>);
        const container = await drawn(writing);
        expect(container.querySelector('blockquote')).not.toBeNull();
        expect(sheet()).toContain('border-left:3px solid blue;color:navy');
    });

    it('several nest and merge, the front innermost winning what it names and inheriting the rest', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /><Ruled /><Inked /></Writing>);
        expect(writing.annotations.at(0)).toBeInstanceOf($Inked);
        await drawn(writing);
        expect(sheet()).toContain('border-left:3px solid blue;color:green');
    });

    it('a theme that holds a component both provides and is the element', async () => {
        const writing = built<$Writing>(<Writing>a <Housed /></Writing>);
        expect(writing.container).toBe(Sheet);
        const container = await drawn(writing);
        expect(container.firstElementChild!.tagName).toBe('DIV');
        expect(sheet()).toContain('padding:1rem');
    });

    it('presenting another theme through $is redraws what the writing shows, and taking it away redraws again', async () => {
        const writing = built<$Writing>(<Writing>a quote <Quoted /><Ruled /></Writing>);
        const container = await drawn(writing);
        const was = container.firstElementChild!.className;
        await act(async () => { writing.$is = Inked; });
        await settled();
        expect(container.firstElementChild!.className).not.toBe(was);
        expect(sheet()).toContain('border-left:3px solid blue;color:green');
        await act(async () => { writing.$is = []; });
        await settled();
        expect(container.firstElementChild!.className).toBe(was);
    });

    it('a repressor takes it out of expression and the writing is drawn unthemed', async () => {
        const writing = built<$Writing>(<Writing is={Unthemed}>a quote <Quoted /><Ruled /></Writing>);
        expect(writing.is(Theme)).toBe(false);
        await drawn(writing);
        expect(sheet()).toContain('border-left:3px solid silver;color:black');
    });

    it('a theme holds only formats, and says so when the binder asks', () => {
        expect(built<$Writing>(<Writing><Ruled /></Writing>).specify()).toEqual([]);
        expect(built<$Theme>(<Theme><Quoted /></Theme>).specification).toBeInstanceOf(ThemeSpecification);
        expect(built<$Writing>(<Writing><Theme><Quoted /></Theme></Writing>).specify()).toEqual([]);
        expect(built<$Writing>(<Writing><Theme>prose</Theme></Writing>).specify())
            .toEqual(['Writing / Theme 0: a theme holds only formats, and this one holds something else']);
        expect(built<$Writing>(<Writing><Theme><Unthemed /></Theme></Writing>).specify())
            .toEqual(['Writing / Theme 0: a theme holds only formats, and this one holds something else']);
    });
});
