import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Block, $Chemical, $check, type $Html, type $Written } from '@/index';
import { $Html$ } from '@/abstraction/chemical';
import { children } from '@/index';

// $Block — what a bond constructor is handed for prose, and the one content kind
// with behaviour of its own.
//
// A run of inline writing arrives as ONE argument. Reading it is iterating it,
// and every reading of a block is a block, so readings compose instead of
// falling out into an array on the first one.

class $Word extends $Chemical {
    constructor() { super(); this.inline = true; }
    view() { return <b>{this[children]}</b>; }
}
const Word = $($Word);

// The bond declares the block as itself. `$Block` names the same type —
// that is the point of the enum pointing at the class — so both spellings are
// exercised here deliberately.
class $Host extends $Chemical {
    held!: $Block;
    $Host(block: $Block) { this.held = $check(block, $Block); }
    view() { return <div />; }
}
const Host = $($Host);

// Written through the arguments channel rather than as JSX children, because a
// built chemical is one of the three things a block holds and React refuses one
// as a child. Raw prose, raw numbers, written elements and built chemicals all
// reach the bond by this route.
class $Take extends $Chemical {
    taken!: $Block;
    $Take(block: $Block) { this.taken = $check(block, 'block'); }
    view() { return <div />; }
}
const Take = $($Take);

const held = (...inside: unknown[]): $Block =>
    ($(<Take />, ...inside as $Written[]) as $Take).taken;

describe('what a bond constructor is handed for prose', () => {
    it('IS a $Block, and a $Block is an $Html$ of the block kind', () => {
        const block = held('Call me ', <Word>Ishmael</Word>, '!');
        expect(block).toBeInstanceOf($Block);
        expect(block).toBeInstanceOf($Html$);
        expect(block.type).toBe('block');
    });

    it('$check answers to the class AND to the tag', () => {
        const block = held('prose');
        expect($check(block, $Block)).toBe(block);
        expect($check(block, 'block')).toBe(block);
    });

    // The hop through `unknown` is not ceremony — $check is declared to answer
    // what it was given, so an empty block comes back typed as the `undefined`
    // that went in. Worth its own look; not this feature's to fix.
    it('and empty content still gives a block rather than nothing', () => {
        const fromClass: unknown = $check(undefined, $Block);
        const fromTag: unknown = $check(undefined, 'block');
        expect(fromClass).toBeInstanceOf($Block);
        expect(fromTag).toBeInstanceOf($Block);
        expect((fromClass as $Block).length).toBe(0);
    });
});

describe('reading a block sequentially', () => {
    it('iterates what was written, as it was written, in order', () => {
        const word = $(<Word />) as $Word;
        const block = held('a ', 2, ' ', word);
        expect([...block]).toEqual(['a ', 2, ' ', word]);
    });

    it('answers its length and its elements', () => {
        const block = held('a ', <Word>b</Word>, ' c');
        expect(block.length).toBe(3);
        expect(block.elements.length).toBe(3);
    });

    it('spreads, destructures and drives a for-of like any other sequence', () => {
        const block = held('one', 'two', 'three');
        const [first, ...rest] = block;
        expect(first).toBe('one');
        expect(rest.length).toBe(2);
        let count = 0;
        for (const _piece of block) count++;
        expect(count).toBe(3);
    });
});

describe('EVERY READING OF A BLOCK IS A BLOCK', () => {
    const prose = () => held('Call me ', <Word>Ishmael</Word>, '. Some ', <Word>years</Word>, ' ago');

    it('where filters into a new block', () => {
        const words = prose().where(piece => typeof piece === 'object');
        expect(words).toBeInstanceOf($Block);
        expect(words.length).toBe(2);
        expect(words).not.toBe(prose());
    });

    it('select maps into a new block', () => {
        const shouted = held('a', 'b').select(piece => String(piece).toUpperCase());
        expect(shouted).toBeInstanceOf($Block);
        expect([...shouted]).toEqual(['A', 'B']);
    });

    it('selectMany flattens into a new block', () => {
        const doubled = held('a', 'b').selectMany(piece => [piece, piece] as $Written[]);
        expect(doubled).toBeInstanceOf($Block);
        expect([...doubled]).toEqual(['a', 'a', 'b', 'b']);
    });

    it('single takes exactly one piece, and refuses any other count', () => {
        const block = held('a', 'bb', 'ccc');
        expect(block.single(piece => String(piece).length === 2)).toBe('bb');
        expect(() => block.single(piece => String(piece).length > 1)).toThrow(/found 2/);
        expect(() => block.single(() => false)).toThrow(/found 0/);
    });

    it('SO READINGS COMPOSE — a reading of a reading of a reading', () => {
        const read = prose()
            .where(piece => typeof piece === 'string')
            .select(piece => String(piece).trim())
            .where(piece => String(piece).length > 0);
        expect(read).toBeInstanceOf($Block);
        expect([...read]).toEqual(['Call me', '. Some', 'ago']);
    });

    it('and the original is untouched by any of them', () => {
        const block = prose();
        block.where(() => false);
        block.select(() => 'x');
        expect(block.length).toBe(5);
    });
});

describe('a block is a chemical, so it draws', () => {
    it('renders its pieces — raw prose as itself, a written chemical whole', () => {
        const block = held('Call me ', <Word>Ishmael</Word>, ' today');
        const Drawn = $(block);
        const { container } = render(<Drawn />);
        expect(container.textContent).toBe('Call me Ishmael today');
        expect(container.querySelector('b')?.textContent).toBe('Ishmael');
    });

    it('and so does a block that a reading made', () => {
        const words = held('a ', <Word>b</Word>, ' c').where(piece => typeof piece === 'object');
        const Drawn = $(words);
        expect(render(<Drawn />).container.textContent).toBe('b');
    });

    it('a made block goes back to a bond constructor whole', () => {
        const some = held('a', 'b', 'c').where(piece => piece !== 'b');
        const host = $(<Host />, some) as $Host;
        expect(host.held).toBe(some);
        expect([...host.held]).toEqual(['a', 'c']);
    });
});

// =============================================================================
// A $Block IS AN $Html$, and the check knows it both ways.
//
// $Block extends $Html$<'block'>, so everything that recognises an $Html$
// recognises a block — and the check still DISCRIMINATES, which is the half that
// makes a subclass worth having rather than a label.
// =============================================================================

describe('a block answers as the html it is', () => {
    it('instanceof reaches the base, and the base member is inherited', () => {
        const block = held('prose');
        expect(block).toBeInstanceOf($Html$);
        expect(block).toBeInstanceOf($Block);
        expect(block.type).toBe('block');
        expect(block.inline).toBe(false);
    });

    it('$check passes it as the base class, as the subclass, and as the tag', () => {
        const block = held('prose');
        expect($check(block, $Html$ as never)).toBe(block);
        expect($check(block, $Block)).toBe(block);
        expect($check(block, 'block')).toBe(block);
    });

    // The negative half, taken where the framework actually raises: inside a
    // bond constructor, drawn. Outside a bond $check RECORDS and returns, and a
    // failed bond is kept on the instance and drawn where it stands rather than
    // thrown — so the refusal is read on the page.
    class $Wants extends $Chemical {
        $Wants(...parts: unknown[]) { $check(parts[0] as never, $Block); }
        view() { return <div className="wanted" />; }
    }
    const Wants = $($Wants);

    it('AND IT STILL DISCRIMINATES — an html that is not a block is refused, by name', () => {
        const notABlock = $(<div>standing apart</div>);
        expect(notABlock).toBeInstanceOf($Html$);
        expect(notABlock).not.toBeInstanceOf($Block);

        const { container } = render(<Wants><div>standing apart</div></Wants>);
        expect(container.querySelector('.wanted')).toBeNull();
        expect(container.textContent).toMatch(/\$Block/);
    });

    it('and it accepts one — the same bond, given a block, draws', () => {
        const { container } = render(<Wants>plain prose</Wants>);
        expect(container.querySelector('.wanted')).not.toBeNull();
    });
});
