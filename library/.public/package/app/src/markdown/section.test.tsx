import React from 'react';
import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $Figure } from '@/writing/Figure';
import { $MarkdownSection, MarkdownSection, $Fenced, Fenced, $Displayed } from './section';
import { $MarkdownParagraph } from './paragraph';

const md = (copy: string): $MarkdownSection => $(<MarkdownSection><Title>A Section</Title>{copy}</MarkdownSection>);
const plain = (copy: string): $Section => $(<Section><Title>A Section</Title>{copy}</Section>);

describe('a markdown section — a fence is a part at the index it was written at', () => {
    it('AE2 — the fence stands at its index and the prose keeps counting around it', () => {
        const s = md('\n\nBefore the block.\n\n```tsx\nconst a = 1;\n```\n\nAfter the block.');
        const parts = s.parts();
        const at = parts.findIndex(p => p instanceof $Figure);
        expect(at).toBe(2);
        expect(parts[at].index).toBe(2);
        expect(parts[3].copy).toContain('After the block');
        expect(parts[3].index).toBe(3);
    });

    it('a fence containing a blank line is still ONE part', () => {
        const s = md('\n\nBefore.\n\n```tsx\nconst a = 1;\n\nconst b = 2;\n```\n\nAfter.');
        const fences = s.parts().filter(p => p instanceof $Fenced) as $Fenced[];
        expect(fences.length).toBe(1);
        expect(fences[0].content).toContain('const b = 2;');
    });

    it('AE3 — two info strings give two different kinds in one section', () => {
        const s = md('\n\n```tsx\nconst a = 1;\n```\n\n```text\nplain\n```');
        const fences = s.parts().filter(p => p instanceof $Fenced) as $Fenced[];
        expect(fences.map(f => f.kind)).toEqual(['tsx', 'text']);
    });

    it('AE11 — an unterminated fence is invalid IN ITS OWN WORDS and does not swallow the section', () => {
        const s = md('\n\nBefore.\n\n```tsx\nconst a = 1;');
        // The prose before it survives — the fence did not eat the section.
        expect(s.parts().some(p => p.copy.includes('Before'))).toBe(true);
        // And a fence with nothing to draw is invalid in its own words.
        const empty: $Fenced = $(<Fenced />);
        expect(empty.valid()).toBe(false);
    });

    it('display math is a paragraph-grade figure at its own index', () => {
        const s = md('\n\nBefore.\n\n$$e^{i\\pi} + 1 = 0$$\n\nAfter.');
        const shown = s.parts().find(p => p instanceof $Displayed) as $Displayed;
        expect(shown).toBeDefined();
        expect(shown.kind).toBe('math');
        expect(shown.index).toBe(2);
    });

    it('a section with no markdown in it divides exactly as a plain section does', () => {
        const copy = '\n\nOne paragraph here.\n\nAnd a second one.';
        expect(md(copy).parts().map(p => p.copy)).toEqual(plain(copy).parts().map(p => p.copy));
    });

    it('the prose between fences composes to markdown paragraphs, not plain ones', () => {
        const s = md('\n\nProse with a [link](https://x.com) in it.');
        const body = s.parts().find(p => p instanceof $MarkdownParagraph);
        expect(body).toBeDefined();
    });
});
