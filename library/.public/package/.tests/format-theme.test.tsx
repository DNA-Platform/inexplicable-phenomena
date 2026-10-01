import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { ElementType, ReactNode } from 'react';
import { $, $Chemical, selection } from '@dna-platform/chemistry';
import { $Writing, $Format, $Theme, Paragraph, Parenthetical } from '@dna-platform/public';
import { $Book, Book, $Chapter, Chapter, $Paragraph, Cover, Title, Author, Subject } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const sheet = (): string => [...document.querySelectorAll('style')].map(style => style.textContent).join('\n');
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};

// A LIBRARY'S THEME NAMES ITS OWN VALUES since Sprint 97's policy — the base has none; a theme is a subclass with
// fields, named in `values`, which the provider declares inline and every rule beneath reads as a variable.
class $Inky extends $Theme {
    ink = 'black';
}
const Inky = $($Inky);

const shelf = (paragraph: React.ReactNode): $Book => built<$Book>(
    <Book>
        <Inky />
        <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
        <Chapter><Title>[A Quote](/a-paper/a-quote/)</Title>{paragraph}</Chapter>
    </Book>
);

// A FORMAT EXPOSES ITS OWN PROPERTIES BY HANDING THEM TO ITS COMPONENT — Sprint 94, Doug, 2026-09-29: "Formats can
// consume theme properties as well as exposing their own, both of which can be passed to their components or maybe
// to control the classes they put on their writing." The component is made once, in the bond, as Table's grid is.
class $Quoted extends $Format {
    rule = 'silver';
    ink = 'black';
    style: ElementType = selection.blockquote<{ $rule: string; $ink: string }>`
        border-left: 3px solid ${({ $rule }) => $rule};
        color: ${({ $ink }) => $ink};
    `;

    $Quoted(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        const Quote = this.style;
        this.style = (props: { children?: ReactNode; className?: string }) => <Quote $rule={this.rule} $ink={this.ink} {...props} />;
    }
}

class $Ruled extends $Quoted {
    rule = 'blue';
    ink = 'navy';
}

// A FORMAT READS THE THEME'S VALUES THROUGH ITS BOOK — "this.book.theme should get it right?… get theme() { return
// this.book.theme; } And that can be progressively typed on subclasses. Now every format has a theme."
class $Inked extends $Format {
    style: ElementType = selection.span<{ $ink: string }>`
        color: ${({ $ink }) => $ink};
    `;

    $Inked(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        const Span = this.style;
        this.style = (props: { children?: ReactNode; className?: string }) => <Span $ink={(this.theme as $Inky).ink} {...props} />;
    }
}

// A FORMAT THAT SAYS themeProvider PROVIDES ITS THEME TO EVERYTHING IT DRAWS — "Give it a property called themeProvider
// = true - it is a styled component, so we can reference that" — the book's theme unless a subclass reaches another:
// "it has the structure to reach to other themes if need be in subclasses."
class $Housed extends $Format {
    themeProvider = true;
    style = selection.section`
        padding: 1rem;
    `;
}

class $Dark extends $Inky {
    ink = 'ivory';
}
const Dark = $($Dark);

class $Nightly extends $Housed {
    protected _dark!: $Dark;

    override get theme(): $Dark { return this._dark; }

    $Nightly(...chemicals: $Chemical[]) {
        this._dark = built<$Dark>(<Dark />);
        this.$Format(...chemicals);
    }
}

class $Themed extends $Format {
    style = selection.em`
        color: ${({ theme }: { theme: { ink?: string } }) => theme.ink ?? 'unprovided'};
    `;
}

const Quoted = $($Quoted);
const Ruled = $($Ruled);
const Inked = $($Inked);
const Housed = $($Housed);
const Nightly = $($Nightly);
const Themed = $($Themed);

describe('a format consumes its theme through its book, exposes its own properties to its component, and may provide', () => {
    it('keeps the writing an element of its own inside the provider\'s, with the classes its annotations gave it', async () => {
        const book = shelf(<Paragraph>prose <Housed /><Parenthetical /></Paragraph>);
        const container = await drawn(book);
        const provided = container.querySelector('section')!;
        expect(provided.className).toContain('pd-container');
        expect(provided.firstElementChild!.className).toContain('pa-parenthetical');
    });

    it('a format\'s own properties reach its component, and a subclass setting them draws its own', async () => {
        await drawn(shelf(<Paragraph>a quote <Quoted /></Paragraph>));
        expect(sheet()).toContain('border-left:3px solid silver');
        expect(sheet()).toContain('color:black');
        await drawn(shelf(<Paragraph>a quote <Ruled /></Paragraph>));
        expect(sheet()).toContain('border-left:3px solid blue');
        expect(sheet()).toContain('color:navy');
    });

    it('a format reads its book\'s theme, typed as the base, and hands a value it reads to its component; the variable form is the provider\'s', async () => {
        const book = shelf(<Paragraph>inked <Inked /><Themed /></Paragraph>);
        const inked = book.text.find($Chapter)[1].text.find($Paragraph)[0].annotations.find($Inked)[0];
        expect(inked.theme).toBe(book.theme);
        expect((inked.theme as $Inky).ink).toBe('black');
        await drawn(book);
        expect(sheet()).toContain('color:black');
    });

    it('a format built in no book has no theme, and says so', () => {
        const alone = built<$Writing>(<Paragraph>alone <Themed /></Paragraph>);
        const themed = alone.annotations.find($Themed)[0];
        expect(() => themed.theme).toThrow('a format reads its theme from its book, and this one stands in none');
    });

    // THE PROVIDER IS CHEMISTRY'S since Sprint 97 — Doug: "Why can't you just have reactive properties and they are
    // templated into the string?" The layer answers chemistry's theme symbol with its Format's theme, and chemistry's
    // providing() wraps it in ThemeProvider with a live face over that chemical, so a template reads the field itself;
    // a Format reaching another theme hands that one down, the gap Themes and Formats had recorded as owed.
    it('one that provides hands its theme to everything it draws, the book\'s or another a subclass reaches, as the fields themselves', async () => {
        await drawn(shelf(<Paragraph>a quote <Housed /><Themed /></Paragraph>));
        expect(sheet()).toContain('color:black');
        await drawn(shelf(<Paragraph>a quote <Nightly /><Themed /></Paragraph>));
        expect(sheet()).toContain('color:ivory');
    });
});
