import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { $, $Chemical, Perspective } from '@/index';

// $Note — someone else's chemical: no perspective code, and a protected member.
class $Note extends $Chemical {
    text = 'hello';
    protected tone = '!';
    view() { return <span className="v">note:{this.text}</span>; }
}

// Lenses are subclasses overriding `view`, revealing themselves. $Note is untouched.
class Plain extends $Note {                 // overrides nothing → the base view; the default
    constructor() { super(); if (new.target === Plain) this.reveal(new Perspective('plain', true)); }
}
class Shout extends $Note {
    constructor() { super(); if (new.target === Shout) this.reveal(new Perspective('shout')); }
    view() { return <span className="v">NOTE:{this.text.toUpperCase()}{this.tone}</span>; } // reaches protected `tone`
}
new Plain();
new Shout();

describe('perspectives — lenses bound to a live chemical', () => {
    it('a chemical you do not own gains lenses added from outside', () => {
        expect(new $Note().perspectives.map(p => p.name)).toEqual(expect.arrayContaining(['plain', 'shout']));
    });

    it('one is marked the default', () => {
        expect(new $Note().perspectives.filter(p => p.default).map(p => p.name)).toEqual(['plain']);
    });

    it('a fetched lens is bound to the instance and renders it — reaching protected state', () => {
        const note = new $Note();
        note.text = 'whale';
        const shout = note.perspectives.find(p => p.name === 'shout')!;
        expect(shout.instance).toBe(note);                                     // the instance inserted itself
        const { container } = render(<>{shout.render()}</>);
        expect(container.querySelector('.v')!.textContent).toBe('NOTE:WHALE!'); // drawn through Shout, reaching `tone`
    });

    it('the no-override lens renders the base view', () => {
        const note = new $Note();
        const plain = note.perspectives.find(p => p.name === 'plain')!;
        expect(render(<>{plain.render()}</>).container.querySelector('.v')!.textContent).toBe('note:hello');
    });

    it('each instance gets its own bound lenses, cached', () => {
        const a = new $Note(); const b = new $Note();
        expect(a.perspectives.find(p => p.name === 'shout')!.instance).toBe(a);
        expect(b.perspectives.find(p => p.name === 'shout')!.instance).toBe(b);
        expect(a.perspectives).toBe(a.perspectives); // cached — stable identity across reads
    });

    it('the live re-expression: a consumer renders a lens; mutate the instance; it repaints', async () => {
        class Viewer extends $Chemical {
            note!: $Note;
            Viewer(note: $Note) { this.note = note; }
            view() {
                const lens = this.note.perspectives.find(p => p.name === 'shout')!;
                return (
                    <div>
                        <button onClick={() => { this.note.text = 'whale'; }} />
                        <span>{lens.render()}</span>
                    </div>
                );
            }
        }
        const V = $(Viewer); const Note = $($Note);
        const { container } = render(<V><Note /></V>);
        expect(container.querySelector('.v')!.textContent).toBe('NOTE:HELLO!');  // the note, through Shout
        await act(async () => { container.querySelector('button')!.click(); });
        expect(container.querySelector('.v')!.textContent).toBe('NOTE:WHALE!');  // mutated, repainted live
    });

    it('a lens of a lens still belongs to the base', () => {
        class Louder extends Shout {
            constructor() { super(); if (new.target === Louder) this.reveal(new Perspective('louder')); }
        }
        new Louder();
        expect(new $Note().perspectives.map(p => p.name)).toContain('louder'); // filed on $Note, not on Shout
    });

    it('a chemical with a bond constructor gains lenses without rewriting it', () => {
        class $Word extends $Chemical { text = 'hi'; view() { return null; } }
        new $Word();
        class $Card extends $Chemical {
            label = '?';
            $Card(word: $Word) { this.label = word.text; }
            view() { return <span className="v">card:{this.label}</span>; }
        }
        new $Card();
        class Boxed extends $Card {
            constructor() { super(); if (new.target === Boxed) this.reveal(new Perspective('boxed')); }
            view() { return <span className="v">[{this.label}]</span>; }
        }
        new Boxed();

        expect(new $Card().perspectives.map(p => p.name)).toContain('boxed');
        const Card = $($Card); const Word = $($Word);
        const { container } = render(<Card><Word /></Card>);
        expect(container.querySelector('.v')!.textContent).toBe('card:hi');
    });
});
