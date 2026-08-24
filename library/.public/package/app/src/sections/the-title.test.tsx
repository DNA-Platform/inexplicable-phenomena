import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import styled from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Title, Title } from '@/writing/Title';
import { $Theme } from '@/writing/Theme';
import { TheTitleDemo } from './the-title';

// THE FOUR THINGS A COUNT CANNOT FAKE, and this is the first of them: one $Title
// drawn three ways on one page, with a fourth untouched and still the default.
//
// Every gate this branch runs is a count, and every entry in the condition report
// was true while all of them were green. What this promise adds is that the SAME
// CLASS answered differently for three different reasons — by prop, by subclass,
// and by a scope registration invisible at the call site — and that the default
// survived being made reachable.

const drawn = () => render(React.createElement(TheTitleDemo)).container;

describe('one $Title, drawn three ways, and a fourth left alone', () => {
    it('draws four headings from one class', () => {
        const heads = drawn().querySelectorAll('h2');
        expect(heads.length).toBe(4);
        // The same words every time, so nothing but the drawing differs.
        expect([...heads].every(h => h.textContent === 'The Change That Changes Nothing')).toBe(true);
    });

    it('and each of the four is drawn by a DIFFERENT component', () => {
        const heads = [...drawn().querySelectorAll('h2')];
        // A styled component's generated class is its identity. Four distinct
        // classes is four distinct components answering for one $Title.
        const looks = heads.map(h => h.className.split(' ')[0]);
        expect(new Set(looks).size).toBe(4);
    });

    it('the FOURTH is the framework default, which is what makes the other three legible', () => {
        const heads = [...drawn().querySelectorAll('h2')];
        const untouched = heads[3];
        // The default carries no aesthetic opinion of the demonstration's — it is
        // whatever the theme says, and it is not any of the three above it.
        const others = heads.slice(0, 3).map(h => h.className.split(' ')[0]);
        expect(others).not.toContain(untouched.className.split(' ')[0]);
    });

    it('and not one of them carries a style attribute', () => {
        // 33 inline style objects in 19 files went to zero. A look is a held
        // component now, which is the only reason any of the three above works.
        const heads = [...drawn().querySelectorAll('h2')];
        expect(heads.every(h => !h.getAttribute('style'))).toBe(true);
    });
});

// THE $ IS ON THE PROPERTY, NEVER AT THE CALL SITE — and the wrong spelling is
// silent, which is the reason this is written down. The page above spent a draft
// handing in `$heading` and drew four identical headings with no complaint.

const Stamped = styled.h3<{ $theme: $Theme }>`color: red;`;

const tag = (t: $Title) => {
    const T = $(t) as never as React.ComponentType;
    return render(React.createElement(T)).container.firstElementChild?.tagName;
};

describe('handing a held look in', () => {
    it('draws its own by default', () => {
        expect(tag($(<Title>a</Title>) as $Title)).toBe('H2');
    });

    it('takes the one it is handed, named WITHOUT the $', () => {
        expect(tag($(<Title heading={Stamped as never}>a</Title>) as $Title)).toBe('H3');
    });

    it('and IGNORES the same name spelled with it, saying nothing', () => {
        // The types refuse this spelling, which is a mercy the runtime does not
        // extend — so it is written past them here to promise what happens when
        // somebody writes it anyway.
        const wrong = React.createElement(Title as never, { $heading: Stamped, children: 'a' });
        expect(tag($(wrong) as $Title)).toBe('H2');
    });

    it('assignment reaches it too, which is what a subclass does', () => {
        const set = $(<Title>a</Title>) as $Title;
        (set as never as { $heading: unknown }).$heading = Stamped;
        expect(tag(set)).toBe('H3');
    });
});
