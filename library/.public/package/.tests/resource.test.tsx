import { describe, it, expect } from 'vitest';
import { $, $Chemical } from '@dna-platform/chemistry';
import { render } from '@testing-library/react';
import { $Writing, CodeNavigator, Resource, $TypeOfResource, reflection } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

const drawn = (node: React.ReactNode) => {
    class $Page extends $Chemical { view(): React.ReactNode { return node; } }
    const Page = $($Page);

    return render(<Page />).container;
};

const source = "import { createInflateRaw } from 'node:zlib';";

// A RESOURCE IS RESOLVED BY THE BINDER, BEFORE ANYTHING DRAWS. `<Resource>.ts</Resource>` is found in
// a chapter's own source and replaced with the navigator below, carrying the file the binder read.
// So what a unit test can hold is the two halves: the marker, which must draw nothing and reach for
// nothing, and the navigator, which must draw a file under its own name.
describe('a resource marks a place and draws nothing itself', () => {
    it('it is an annotation, so it is parenthetical', () => {
        expect(built<$Writing>(<Resource>.ts</Resource>).parenthetical).toBe(true);
    });

    it('and it puts nothing on the page', () => {
        expect(drawn(<Resource>.ts</Resource>).textContent).toBe('');
    });

    it('it carries its own kind, so the binder can find it', () => {
        expect(reflection.is(built<$Writing>(<Resource>.ts</Resource>), $TypeOfResource)).toBe(true);
    });
});

describe('a code navigator draws a file under its own name', () => {
    it('THE FILE IS ON THE PAGE', () => {
        expect(drawn(<CodeNavigator file="2-the-source.ts">{source}</CodeNavigator>).textContent)
            .toContain('createInflateRaw');
    });

    it('under the name a reader would open', () => {
        expect(drawn(<CodeNavigator file="2-the-source.ts">{source}</CodeNavigator>).textContent)
            .toContain('2-the-source.ts');
    });

    // THE LANGUAGE IS READ OFF THE FILE'S NAME, because the file already says so and asking an author
    // to say it again is a second place for it to be wrong.
    it('and is highlighted as the language its extension names', () => {
        const host = drawn(<CodeNavigator file="2-the-source.ts">{source}</CodeNavigator>);
        expect(host.querySelector('code')?.className).toContain('language-typescript');
    });

    it('a file the library knows no grammar for is still drawn', () => {
        const host = drawn(<CodeNavigator file="notes.txt">{'plain words'}</CodeNavigator>);
        expect(host.textContent).toContain('plain words');
    });

    // A NAVIGATOR NAMING NO FILE IS A BLOCK OF CODE A READER CANNOT GO AND FIND, which is the whole
    // point of the kind: the chapter and the file are one thing said twice.
    it('and one naming no file at all is refused', () => {
        expect(() => built<$Writing>(<CodeNavigator>{source}</CodeNavigator>).specify()).toThrow();
    });

    it('as is one whose file came in empty', () => {
        expect(() => built<$Writing>(<CodeNavigator file="2-the-source.ts">{''}</CodeNavigator>).specify()).toThrow();
    });
});
