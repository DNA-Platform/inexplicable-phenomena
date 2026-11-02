import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../app/src/styles/theme';
import CaseOne from '../../app/src/sections/facades/case-1';
import CaseTwo from '../../app/src/sections/facades/case-2';

const drawn = (node: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{node}</ThemeProvider>);

const node = (root: HTMLElement, name: string) =>
    Array.from(root.querySelectorAll('button')).find(b => b.textContent?.startsWith(name))!;

// A LOOK IS CHOSEN FROM A TILE, and a tile is not a <button> — one of the faces
// it previews IS one, and a button inside a button is neither valid nor clickable
// the way either of them means.
const look = (root: HTMLElement, name: string) =>
    Array.from(root.querySelectorAll('[role="button"]')).find(b => b.textContent?.endsWith(name))! as HTMLElement;

describe('the Lab demonstration draws what it claims', () => {
    it('both roots declare the interface, and nothing below them repeats it', () => {
        const { container } = drawn(<CaseOne />);
        const wearing = Array.from(container.querySelectorAll('button'))
            .filter(b => b.textContent?.includes('facade = Card'))
            .map(b => b.textContent!.replace('facade = Card', ''));
        expect(wearing).toEqual(['$Element', '$Body']);
    });

    it('an interface that has never heard of either tree draws both', () => {
        const { container } = drawn(<CaseOne />);
        expect(container.textContent).toContain('Alkali · Metal · Element');
        fireEvent.click(node(container, '$Giant'));
        expect(container.textContent).toContain('Giant · Planet · Body');
        expect(container.textContent).toContain('Jupiter');
        expect(container.textContent).toContain('Saturn');
    });

    it('the deeper the class, the more its card carries', () => {
        const { container } = drawn(<CaseOne />);
        fireEvent.click(node(container, '$Noble'));
        const noble = container.textContent ?? '';
        expect(noble).toContain('shell');
        expect(noble).not.toContain('conducts');
        fireEvent.click(node(container, '$Alkali'));
        const alkali = container.textContent ?? '';
        expect(alkali).toContain('conducts');
        expect(alkali).toContain('reacts');
        expect(alkali).toContain('number');
    });

    it('the look menu redraws every specimen and touches neither tree', () => {
        const { container } = drawn(<CaseOne />);
        // the CARD preview keeps its own miniature, so count rather than presence
        const masses = () => (container.textContent?.match(/22\.99/g) ?? []).length;
        expect(masses()).toBe(2);
        fireEvent.click(look(container, 'tile'));
        expect(masses()).toBe(1);
        expect(container.textContent).toContain('Sodium');
    });

    // THE THIRD LOOK IS A BUTTON, and pressing one opens that specimen full
    // screen — the same card, shown large, rather than a second thing that
    // resembles it. It goes through a portal, so it is looked for on the body.
    it('a specimen drawn as a button opens full screen, and closes again', () => {
        const { container, baseElement } = drawn(<CaseOne />);
        fireEvent.click(look(container, 'button'));
        const pressable = Array.from(container.querySelectorAll('button'))
            .filter(b => /open$/.test(b.textContent ?? ''));
        expect(pressable.length).toBeGreaterThan(0);

        const opened = () => baseElement.querySelectorAll('[data-blown]').length;
        expect(opened()).toBe(0);
        fireEvent.click(pressable[0]);
        expect(opened()).toBe(1);
        expect(baseElement.textContent).toContain('22.99');
        fireEvent.click(baseElement.querySelector('[data-blowup]') as HTMLElement);
        expect(opened()).toBe(0);
    });

    it('one line is the whole difference', () => {
        const { container } = drawn(<CaseTwo />);
        expect(container.textContent).toContain('facade = Card');
        expect(container.textContent).toContain('Worn');
        expect(container.textContent).toContain('declares');
    });
});
