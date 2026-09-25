import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $, styled } from '@dna-platform/chemistry';
import { $Writing, Writing, Paragraph, Parenthetical, $Format } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

class $Quoted extends $Format {
    style = styled.blockquote`
        border-left: 3px solid ${(props: any) => props.theme.rule ?? 'silver'};
        color: ${(props: any) => props.theme.ink ?? 'black'};
    `;
}

class $Ruled extends $Format {
    theme = true;
    rule = 'blue';
    ink = 'navy';
}

class $Inked extends $Format {
    theme = true;
    ink = 'green';
}

class $Housed extends $Format {
    theme = true;
    rule = 'teal';
    style = styled.section`
        padding: 1rem;
    `;
}
const Quoted = $($Quoted);
const Ruled = $($Ruled);
const Inked = $($Inked);
const Housed = $($Housed);

describe('a format that says it is a theme provides its own properties to everything it draws', () => {
    it('keeps the writing an element of its own inside the theme\'s, with the classes its annotations gave it', async () => {
        const writing = built<$Writing>(<Writing>prose <Ruled /><Parenthetical /></Writing>);
        const container = await drawn(writing);
        const themed = container.firstElementChild!;
        expect(themed.tagName).toBe('SPAN');
        expect(themed.className).toBe('pd-container');
        expect(themed.firstElementChild!.tagName).toBe('SPAN');
        expect(themed.firstElementChild!.className).toBe('pa-parenthetical');
    });

    it('provides to everything the writing holds, which is the enclave a composition gives', async () => {
        const writing = built<$Writing>(<Writing><Paragraph>a quote <Quoted /></Paragraph><Ruled /></Writing>);
        await drawn(writing);
        expect(sheet()).toContain('border-left:3px solid blue');
        expect(sheet()).toContain('color:navy');
    });

    it('a format that names a style of its own provides around that element', async () => {
        const writing = built<$Writing>(<Writing><Paragraph>a quote <Quoted /></Paragraph><Housed /></Writing>);
        const container = await drawn(writing);
        expect(container.firstElementChild!.tagName).toBe('SECTION');
        expect(sheet()).toContain('padding:1rem');
        expect(sheet()).toContain('border-left:3px solid teal');
    });

    it('a format that is not a theme provides nothing, and the writing is drawn unthemed', async () => {
        const writing = built<$Writing>(<Writing><Paragraph>a quote <Quoted /></Paragraph></Writing>);
        await drawn(writing);
        expect(sheet()).toContain('border-left:3px solid silver');
        expect(sheet()).toContain('color:black');
    });

    it('a theme on the writing that encloses reaches what is inside it, which is the enclave', async () => {
        const writing = built<$Writing>(
            <Writing>
                <Writing>a quote <Quoted /></Writing>
                <Ruled />
            </Writing>
        );
        await drawn(writing);
        expect(sheet()).toContain('border-left:3px solid blue');
        expect(sheet()).toContain('color:navy');
    });
});
