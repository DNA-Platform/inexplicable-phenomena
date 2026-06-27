import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { $Particle, Perspective } from '@/index';

// The perspective machinery moved from $Chemical up to $Particle (sprint 42,
// phase 1). These tests prove it is now $Chemical-independent: a plain
// $Particle subclass — NOT a $Chemical — gains lenses, binds them to live
// instances, and renders through them, all by inheritance from $Particle.

// $Dot — a particle (not a chemical) with no perspective code, and a protected member.
class $Dot extends $Particle {
    label = 'dot';
    protected mark = '*';
    view() { return <span className="v">dot:{this.label}</span>; }
}

// Lenses are $Particle subclasses overriding `view`, revealing themselves from
// their own ctors. $Dot is untouched.
class Bare extends $Dot {                    // overrides nothing → the base view; the default
    constructor() { super(); if (new.target === Bare) this.reveal(new Perspective('bare', true)); }
}
class Star extends $Dot {
    constructor() { super(); if (new.target === Star) this.reveal(new Perspective('star')); }
    view() { return <span className="v">DOT:{this.label.toUpperCase()}{this.mark}</span>; } // reaches protected `mark`
}
new Bare();
new Star();

describe('perspectives on a plain $Particle — machinery lives at the base, not $Chemical', () => {
    it('reveal called from the ctor files lenses on the base particle', () => {
        expect(new $Dot().perspectives.map(p => p.name)).toEqual(expect.arrayContaining(['bare', 'star']));
    });

    it('one is marked the default', () => {
        expect(new $Dot().perspectives.filter(p => p.default).map(p => p.name)).toEqual(['bare']);
    });

    it('a fetched lens is bound to the instance and renders it — reaching protected state', () => {
        const dot = new $Dot();
        dot.label = 'orb';
        const star = dot.perspectives.find(p => p.name === 'star')!;
        expect(star.instance).toBe(dot);                                       // the instance inserted itself
        const { container } = render(<>{star.render()}</>);
        expect(container.querySelector('.v')!.textContent).toBe('DOT:ORB*');   // drawn through Star, reaching `mark`
    });

    it('the no-override lens renders the base view', () => {
        const dot = new $Dot();
        const bare = dot.perspectives.find(p => p.name === 'bare')!;
        expect(render(<>{bare.render()}</>).container.querySelector('.v')!.textContent).toBe('dot:dot');
    });

    it('each instance gets its own bound lenses, cached', () => {
        const a = new $Dot(); const b = new $Dot();
        expect(a.perspectives.find(p => p.name === 'star')!.instance).toBe(a);
        expect(b.perspectives.find(p => p.name === 'star')!.instance).toBe(b);
        expect(a.perspectives).toBe(a.perspectives); // cached — stable identity across reads
    });

    it('a lens of a lens still belongs to the base particle', () => {
        class Brighter extends Star {
            constructor() { super(); if (new.target === Brighter) this.reveal(new Perspective('brighter')); }
        }
        new Brighter();
        expect(new $Dot().perspectives.map(p => p.name)).toContain('brighter'); // filed on $Dot, not on Star
    });
});
