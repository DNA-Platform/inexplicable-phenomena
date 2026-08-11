import React from 'react';
import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { Title } from '@/writing/Title';
import { $Figure } from '@/writing/Figure';
import { $MarkdownSection, MarkdownSection, $Quoted, $Item, $Plate, $Break } from './section';

// The ordinary things a person writes in markdown. None of them is a new KIND
// of thing: a quoted paragraph and a list item are paragraphs that know what
// bounded them, and an image and a rule are figures. Adding one is a fork in a
// divide or a compose that already existed — which is the whole claim R11 makes.
//
// None of this reaches src/. A list is how you get a list AT THIS LEVEL OF
// DETAIL in a notation; the framework has no opinion about bullets.

const md = (copy: string): $MarkdownSection =>
    $(<MarkdownSection><Title>A Section</Title>{copy}</MarkdownSection>) as $MarkdownSection;

describe('the ordinary marks — a fork each, never a new kind', () => {
    it('a bulleted list is many parts, one paragraph per item, the bullet kept as syntax', () => {
        const s = md('\n\n- first thing\n- second thing\n- third thing');
        const items = s.parts().filter(p => p instanceof $Item) as $Item[];
        expect(items.length).toBe(3);
        expect(items.map(i => i.copy)).toEqual(['first thing', 'second thing', 'third thing']);
        expect(items[0].mark).toBe('-');
        expect(items[0].ordered).toBe(false);
    });

    it('a numbered list knows it is ordered', () => {
        const s = md('\n\n1. first\n2. second');
        const items = s.parts().filter(p => p instanceof $Item) as $Item[];
        expect(items.length).toBe(2);
        expect(items.every(i => i.ordered)).toBe(true);
    });

    it('a block quote is a paragraph that knows it was quoted', () => {
        const s = md('\n\n> a line worth keeping');
        const quoted = s.parts().find(p => p instanceof $Quoted) as $Quoted;
        expect(quoted).toBeDefined();
        expect(quoted.copy).toBe('a line worth keeping');
        expect(quoted.mark).toBe('>');
    });

    it('an image is a figure — its source is content, its alt text the only words it has', () => {
        const s = md('\n\n![a plate of the fold](/plates/fold.png)');
        const plate = s.parts().find(p => p instanceof $Plate) as $Plate;
        expect(plate).toBeDefined();
        expect(plate.kind).toBe('image');
        expect(plate.content).toBe('/plates/fold.png');
        expect(plate.caption).toBe('a plate of the fold');
    });

    it('a thematic break divides without titling', () => {
        const s = md('\n\nBefore.\n\n---\n\nAfter.');
        const parts = s.parts();
        const at = parts.findIndex(p => p instanceof $Break);
        expect(at).toBe(2);
        expect(parts[3].copy).toContain('After');
    });

    it('strikethrough marks are mentioned, and the words between them are read', () => {
        const s = md('\n\nThe ~~old~~ new way.');
        const sentence = s.parts()[1].sentences[0];
        expect(sentence.parts().some(p => p.copy === '~~')).toBe(true);
        expect(sentence.words.map(w => w.copy)).toEqual(['The', 'old', 'new', 'way']);
    });

    it('every one of them is a paragraph-grade part, numbered with the prose around it', () => {
        const s = md('\n\nProse.\n\n- an item\n\n> a quote\n\n---\n\nMore prose.');
        const kinds = s.parts().map(p => p.constructor.name);
        expect(kinds.length).toBeGreaterThan(4);
        // The indexes run without gaps: nothing was dropped on the floor.
        expect(s.parts().map(p => p.index)).toEqual(s.parts().map((_, i) => i));
    });

    it('a figure among them is still a figure', () => {
        const s = md('\n\n![alt](/x.png)\n\n---');
        expect(s.parts().filter(p => p instanceof $Figure).length).toBe(2);
    });
});
