import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { render } from '@testing-library/react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Theme } from '@/writing/Theme';
import * as themes from '@/writing/Theme';

// A THEME HOLDS WHAT WOULD BE INCOHERENT IF EVERY VIEW DECIDED IT ALONE.
//
// The negatives are the promises that matter here — that it names no class,
// renders nothing, and does not reach a scope it was never registered on. Each
// would pass against a global map if it were written the other way round, so
// each is written to fail if it were.

const source = readFileSync(join(__dirname, '../../src/writing/Theme.tsx'), 'utf-8');

const composed = (parts: { parenthetical: boolean }[] = []) => ({
    parts: () => parts,
    parenthetical: false,
});

class $Loud extends $Theme {
    override $ink? = 'red';
}

const Loud = $($Loud);

class $Paged extends $Theme {
    override lay(): 'one' {
        return 'one';
    }
}

const Paged = $($Paged);

// A host that asks for the theme and prints one answer, so resolution can be
// measured through a real render rather than by calling a function.
class $Host extends $Chemical {
    view() {
        const theme = $(themes.Theme).$ as $Theme;
        return <span data-ink={theme.ink} data-lay={theme.lay(composed(), true)} />;
    }
}

const Host = $($Host);

const inkOf = (c: HTMLElement) => c.querySelector('span')?.getAttribute('data-ink');

describe('a theme is resolved, and its default is the argument', () => {
    it('answers its base when nothing is registered', () => {
        const { container } = render(<Host />);
        expect(inkOf(container)).toBe('#14181d');
    });

    it('answers the registered one beneath the scope it was registered on', () => {
        const Shelf = $($, Host);
        $(Shelf, themes.Theme)(Loud);
        const { container } = render(<Shelf />);
        expect(inkOf(container)).toBe('red');
    });

    it('and a host OUTSIDE that scope still answers the base', () => {
        const Shelf = $($, Host);
        $(Shelf, themes.Theme)(Loud);
        render(<Shelf />);
        const { container } = render(<Host />);
        expect(inkOf(container)).toBe('#14181d');
    });

    it('answers rather than throwing when nothing has established a scope', () => {
        expect(() => ($(themes.Theme).$ as $Theme).ink).not.toThrow();
    });
});

describe('a subclass redeclaring ONE member inherits every other', () => {
    it('keeps the base values it did not touch', () => {
        const loud = $(<Loud />) as $Theme;
        expect(loud.ink).toBe('red');
        expect(loud.ground).toBe('#ffffff');
        expect(loud.rule).toBe('#e2e6ea');
        expect(loud.measure).toBe('40rem');
    });

    it('keeps the base answers it did not touch', () => {
        const paged = $(<Paged />) as $Theme;
        expect(paged.lay(composed(), true)).toBe('one');
        expect(paged.ink).toBe('#14181d');
    });
});

describe('the scale DERIVES, so one member moves every step', () => {
    it('steps up and down from the base', () => {
        const theme = $(<themes.Theme />) as $Theme;
        expect(theme.step(0)).toBe('1.000rem');
        expect(theme.step(1)).toBe('1.250rem');
        expect(theme.step(-1)).toBe('0.800rem');
    });

    it('and changing the base moves all of them together', () => {
        const theme = $(<themes.Theme />) as $Theme;
        const before = [theme.step(-1), theme.step(0), theme.step(1)];
        theme.$size = 2;
        const after = [theme.step(-1), theme.step(0), theme.step(1)];
        expect(after).not.toEqual(before);
        expect(after).toEqual(['1.600rem', '2.000rem', '2.500rem']);
    });
});

describe('a value is OPAQUE — the framework never inspects one', () => {
    it('carries a custom property through unchanged', () => {
        const theme = $(<themes.Theme />) as $Theme;
        theme.$ink = 'var(--ink)';
        expect(theme.ink).toBe('var(--ink)');
    });
});

describe('what is laid, and what is drawn', () => {
    it('lays uniform parts as one run and mixed parts each separately', () => {
        const theme = $(<themes.Theme />) as $Theme;
        expect(theme.lay(composed(), true)).toBe('run');
        expect(theme.lay(composed(), false)).toBe('each');
    });

    // SHOWING AND HIDING IS NOT A THEME'S JOB. Doug: "showing / hiding
    // parentheticals isn't part of a theme. Remove it. Hide parentheticals."
    // $Particle already carries $show and $hide on every chemical, and what a
    // theme decides is how parts are LAID, never whether they appear.
    it('decides how parts are laid and says nothing about whether they appear', () => {
        const theme = $(<themes.Theme />) as $Theme;
        expect('draws' in (theme as object)).toBe(false);
        expect('reads' in (theme as object)).toBe(false);
        expect(Object.keys(theme).some(k => k === '$reads')).toBe(false);
    });
});

// THE NEGATIVES. This decision was overturned four times before it was built,
// and these three counts are what would catch a fifth.
describe('the theme knows nothing about any class', () => {
    it('imports no writing class', () => {
        const imports = source.match(/^import .*$/gm) ?? [];
        const reaching = imports.filter(i => /['"]\.\/|['"]\.\.\//.test(i));
        expect(reaching).toEqual([]);
    });

    it('names no writing class anywhere in its source', () => {
        const named = source.match(/\$(?:Writing|Section|Paragraph|Sentence|Word|Letter|Book|Chapter|Cover|Title|Synopsis|Author|Subject|Figure)\b/g) ?? [];
        expect(named).toEqual([]);
    });

    it('returns no markup — its own view draws nothing', () => {
        const theme = $(<themes.Theme />) as $Theme;
        expect(theme.view()).toBe(null);
        expect(source.includes('React.createElement')).toBe(false);
    });
});
