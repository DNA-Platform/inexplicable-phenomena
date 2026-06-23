import { describe, it, expect } from 'vitest';
import React, { ReactNode, ReactElement } from 'react';
import { walk, ElementVisitor } from '@/implementation/walk';
import { reconcile } from '@/implementation/reconcile';

describe('walk() — unified ReactNode tree traversal', () => {
    it('passes through null', () => {
        expect(walk(null, (el) => el)).toBe(null);
    });

    it('passes through undefined', () => {
        expect(walk(undefined, (el) => el)).toBe(undefined);
    });

    it('passes through primitives', () => {
        expect(walk('hello', (el) => el)).toBe('hello');
        expect(walk(42, (el) => el)).toBe(42);
    });

    it('visits element nodes', () => {
        const visited: string[] = [];
        walk(<div className="test" />, (el, children) => {
            visited.push(el.type as string);
            return el;
        });
        expect(visited).toEqual(['div']);
    });

    it('visits nested elements depth-first', () => {
        const visited: string[] = [];
        walk(
            <div><span>text</span></div>,
            (el, children) => {
                visited.push(el.type as string);
                return el;
            }
        );
        expect(visited).toContain('span');
        expect(visited).toContain('div');
        expect(visited.indexOf('span')).toBeLessThan(visited.indexOf('div'));
    });

    it('walks arrays of elements', () => {
        const visited: string[] = [];
        walk(
            [<li key="a">one</li>, <li key="b">two</li>],
            (el) => { visited.push(el.type as string); return el; }
        );
        expect(visited).toEqual(['li', 'li']);
    });

    it('provides walked children to visitor', () => {
        let receivedChildren: ReactNode;
        walk(
            <div><span>inner</span></div>,
            (el, children) => {
                if (el.type === 'div') receivedChildren = children;
                return el;
            }
        );
        expect(receivedChildren).toBeDefined();
    });

    it('visitor can return original element (identity pass)', () => {
        const original = <div className="keep">text</div>;
        const result = walk(original, (el) => el);
        expect(React.isValidElement(result)).toBe(true);
    });

    it('visitor can transform elements', () => {
        const result = walk(
            <div>text</div>,
            (el, children) => React.createElement('span', el.props, children)
        ) as ReactElement<any>;
        expect(result.type).toBe('span');
    });
});

describe('walk() — paired traversal', () => {
    it('passes pair to visitor', () => {
        const cached = <div id="cached" />;
        const fresh = <div id="fresh" />;
        let receivedPair: ReactElement | undefined;
        walk(fresh, (el, children, pair) => {
            receivedPair = pair;
            return el;
        }, cached);
        expect(receivedPair).toBe(cached);
    });

    it('pairs array elements by index', () => {
        const cached = [<li key="a">old</li>, <li key="b">old</li>];
        const fresh = [<li key="a">new</li>, <li key="b">new</li>];
        const pairs: Array<ReactElement | undefined> = [];
        walk(fresh, (el, children, pair) => {
            pairs.push(pair);
            return el;
        }, cached);
        expect(pairs).toHaveLength(2);
        expect(pairs[0]).toBe((cached as any)[0]);
        expect(pairs[1]).toBe((cached as any)[1]);
    });

    it('pairs nested children', () => {
        const cached = <div><span>old</span></div>;
        const fresh = <div><span>new</span></div>;
        const pairs: Array<string | undefined> = [];
        walk(fresh, (el, children, pair) => {
            pairs.push(pair ? (pair.type as string) : undefined);
            return el;
        }, cached);
        expect(pairs).toContain('span');
        expect(pairs).toContain('div');
    });
});

describe('reconcile() — built on walk', () => {
    it('returns cached when view unchanged', () => {
        const cached = <div className="a">text</div>;
        const fresh = <div className="a">text</div>;
        expect(reconcile(fresh, cached)).toBe(cached);
    });

    it('returns new when view changed', () => {
        const cached = <div className="a" />;
        const fresh = <div className="b" />;
        expect(reconcile(fresh, cached)).toBe(fresh);
    });

    it('returns cached for matching nested trees', () => {
        const cached = <div><span>inner</span></div>;
        const fresh = <div><span>inner</span></div>;
        expect(reconcile(fresh, cached)).toBe(cached);
    });

    it('returns new when nested content changes', () => {
        const cached = <div><span>old</span></div>;
        const fresh = <div><span>new</span></div>;
        expect(reconcile(fresh, cached)).not.toBe(cached);
    });

    it('returns cached for matching arrays', () => {
        const cached = [<li key="a">one</li>, <li key="b">two</li>];
        const fresh = [<li key="a">one</li>, <li key="b">two</li>];
        expect(reconcile(fresh, cached)).toBe(cached);
    });

    it('returns new for different arrays', () => {
        const cached = [<li key="a">one</li>];
        const fresh = [<li key="a">one</li>, <li key="b">two</li>];
        expect(reconcile(fresh, cached)).not.toBe(cached);
    });

    it('handles null correctly', () => {
        expect(reconcile(null, null)).toBe(null);
        expect(reconcile(null, <div />)).toBe(null);
        expect(reconcile(<div />, null)).not.toBe(null);
    });

    it('handles primitives', () => {
        expect(reconcile('same', 'same')).toBe('same');
        expect(reconcile('new', 'old')).toBe('new');
    });

    it('same function reference returns cached', () => {
        const fn = () => {};
        const cached = <button onClick={fn} />;
        const fresh = <button onClick={fn} />;
        expect(reconcile(fresh, cached)).toBe(cached);
    });
});
