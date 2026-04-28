import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $ } from '@/abstraction/chemical';

// =============================================================================
// $('tagName') — HTML element catalogue.
//
// First call lazily creates a reactive `$Html$` chemical for the tag and
// caches its Component. Subsequent calls return the cache. `$(tag, override)`
// registers a custom Component to be returned for that tag thereafter.
// =============================================================================

describe('$("tagName") — HTML catalogue lookup', () => {
    it('returns a Component for a known HTML tag', () => {
        const Div = $('div');
        expect(typeof Div).toBe('function');
    });

    it('renders into a real DOM element matching the tag', () => {
        const Span = $('span');
        const { container } = render(React.createElement(Span as any, null, 'hello'));
        const span = container.querySelector('span');
        expect(span).not.toBeNull();
        expect(span!.textContent).toBe('hello');
    });

    it('caches: $("div") twice returns the same Component reference', () => {
        const A = $('article');
        const B = $('article');
        expect(A).toBe(B);
    });

    it('different tags produce different Components', () => {
        const A = $('p');
        const B = $('h1');
        expect(A).not.toBe(B);
    });
});


describe('$("tagName", override) — HTML catalogue registration', () => {
    it('registering an override replaces the cached Component for that tag', () => {
        const Custom: React.FC<any> = (props) =>
            React.createElement('section', { 'data-custom': 'yes' }, props.children);
        $('aside', Custom);

        const A = $('aside');
        expect(A).toBe(Custom);

        const { container } = render(React.createElement(A as any, null, 'in aside'));
        const section = container.querySelector('section');
        expect(section).not.toBeNull();
        expect(section!.getAttribute('data-custom')).toBe('yes');
        expect(section!.textContent).toBe('in aside');
    });

    it('subsequent lookups continue to return the override', () => {
        const Custom: React.FC<any> = (props) =>
            React.createElement('mark', null, props.children);
        $('q', Custom);
        const Q1 = $('q');
        const Q2 = $('q');
        expect(Q1).toBe(Q2);
        expect(Q1).toBe(Custom);
    });
});


describe('$("tagName") — used as a JSX-mountable component', () => {
    it('mounts inside a fragment with the right shape', () => {
        const Div = $('div');
        const Span = $('span');
        const { container } = render(
            React.createElement(Div as any, { className: 'wrap' },
                React.createElement(Span as any, null, 'one'),
                React.createElement(Span as any, null, 'two'),
            )
        );
        const div = container.querySelector('div.wrap');
        expect(div).not.toBeNull();
        expect(div!.querySelectorAll('span').length).toBe(2);
    });
});
