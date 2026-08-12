import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Code } from '@/writing/Code';
import { $Figure } from '@/writing/Figure';
import { $Link } from '@/reference/Link';
import { $Formula } from '@/writing/Formula';
import { $Snippet } from '@/writing/Snippet';

// THE NOTATION IS THE LEVELS' OWN. There is no kind of section that speaks it —
// a section speaks it, because it is not a kind of writing, it is how writing is
// written. These promises are the whole of R15c.

const section = (prose: string): $Section =>
    $(<Section><Title>A Section</Title>{`\n\n${prose}`}</Section>);

// A SECTION COMPOSES PARAGRAPHS. Doug, 2026-08-13: "# X / ## Y / ### Z / # A —
// that's just 4 sections, and the levels and nesting can be handled elsewhere."
// So a heading of ANY depth is a TITLE at paragraph grade, standing among the
// paragraphs; depth becomes a later layer of containment bolted on top, and the
// parse stops carrying a tree it was never asked for.
describe('a heading is a title, and a section is a flat run of paragraphs', () => {
    it('a heading becomes a TITLE among the paragraphs, not a subsection', () => {
        const s = section('Opening prose.\n\n## The Inner Part\n\nInner prose here.\n\nMore of it.');
        expect(s.parts().some(p => p instanceof $Section)).toBe(false);
        const titles = s.parts().filter(p => p instanceof $Title) as $Title[];
        expect(titles.map(t => t.copy)).toContain('The Inner Part');
        expect(s.paragraphs.map(p => p.copy)).toContain('Opening prose.');
        expect(s.paragraphs.map(p => p.copy)).toContain('More of it.');
    });

    it('depth does not nest — every heading stands at the same grade', () => {
        const s = section('## One\n\nFirst.\n\n### Deeper\n\nDeep prose.\n\n## Two\n\nSecond.');
        expect(s.parts().some(p => p instanceof $Section)).toBe(false);
        const titles = (s.parts().filter(p => p instanceof $Title) as $Title[]).map(t => t.copy);
        expect(titles).toEqual(['A Section', 'One', 'Deeper', 'Two']);
    });

    it('the flat reading reaches through every level of nesting', () => {
        const s = section('Top.\n\n## One\n\nFirst.\n\n### Deeper\n\nDeep prose.');
        expect(s.paragraphs.map(p => p.copy)).toEqual(
            expect.arrayContaining(['Top.', 'First.', 'Deep prose.'])
        );
        expect(s.words.map(w => w.copy)).toContain('Deep');
    });

    it('the section\'s own title stands at zero, and a heading in its prose is another title', () => {
        const s = section('## Made By The Notation\n\nProse.');
        expect(s.parts()[0]).toBeInstanceOf($Title);
        expect(s.parts()[0].copy).toBe('A Section');
        expect(s.canonical).toBe(s.parts()[0]);
        expect(s.parts()[1]).toBeInstanceOf($Title);
        expect(s.parts()[1].copy).toBe('Made By The Notation');
    });
});

describe('every kind the notation names, and each is a part at its own level', () => {
    it('a fence is a figure whose INFO STRING chooses what draws it', () => {
        const s = section('Before.\n\n```tsx\nconst a = 1;\n```\n\nAfter.');
        const fence = s.parts().find(p => p instanceof $Code) as $Code;
        expect(fence).toBeDefined();
        expect(fence.language).toBe('tsx');
        expect(fence.source).toContain('const a = 1;');
        // Standing where it was written, with the prose counting around it.
        expect(s.parts().map(p => p.copy)[1]).toBe('Before.');
        expect(s.parts()[3].copy).toBe('After.');
    });

    it('a fence containing a blank line is still ONE part', () => {
        const s = section('```tsx\nconst a = 1;\n\nconst b = 2;\n```');
        const fence = s.parts().find(p => p instanceof $Code) as $Code;
        expect(fence.source).toContain('const a = 1;');
        expect(fence.source).toContain('const b = 2;');
        expect(s.parts().filter(p => p instanceof $Code).length).toBe(1);
    });

    it('a quote, a bullet, an image and a rule each fork into their own kind', () => {
        const s = section('> a quoted line\n\n- an item\n\n![the alt](/x.png)\n\n---');
        const parts = s.parts();
        expect(parts.some(p => p instanceof $Paragraph && p.mark !== '')).toBe(true);
        expect(parts.some(p => p instanceof $Paragraph && p.mark !== '')).toBe(true);
        const plate = parts.find(p => p instanceof $Figure) as $Figure;
        // A FIGURE IS ITS CAPTION. What it draws is a subclass's view.
        expect(plate.caption.copy).toBe('the alt');
        expect(parts.some(p => p instanceof $Figure)).toBe(true);
    });

    it('a run of bullets is MANY parts — each item is a paragraph in its own right', () => {
        const s = section('- one\n- two\n- three');
        expect(s.parts().filter(p => p instanceof $Paragraph && p.mark !== '').length).toBe(3);
    });

    it('display mathematics is a figure at paragraph grade', () => {
        const s = section('Before.\n\n$$e^{i\\pi} + 1 = 0$$\n\nAfter.');
        const shown = s.parts().find(p => p instanceof $Figure) as $Figure;
        expect(shown).toBeDefined();
        // A FIGURE IS ITS CAPTION; what it draws belongs to a subclass's view.
        expect(shown.caption.copy).toContain('e^{i\\pi}');
    });
});

describe('the inline marks, at word grade, and what they must not eat', () => {
    const words = (prose: string) => section(prose).parts()[1].parts()[0].parts();

    it('a link is a word that points, and its target never reaches the word parse', () => {
        const s = section('Read [the inner chapter](#4) now.');
        const pointing = s.words.find(w => w instanceof $Link) as $Link;
        expect(pointing).toBeDefined();
        expect(pointing.copy).toBe('the inner chapter');
        expect(pointing.url).toBe('#4');
        // 'https' and 'com' are not prose.
        expect(s.words.map(w => w.copy)).not.toContain('4');
    });

    it('an inline formula and an inline code span are content that is not writing', () => {
        const parts = words('The class $C^\\infty$ and the call `x.y()` stand here.');
        const inlines = parts.filter(w => w instanceof $Formula || w instanceof $Snippet);
        expect(inlines.map(i => i.constructor.name).sort()).toEqual(['$Formula', '$Snippet']);
        expect(inlines.every(i => i.role === 'mention')).toBe(true);
    });

    it('MATHEMATICS KEEPS ITS UNDERSCORES — a composite is pulled whole before any mark inside it is read', () => {
        const parts = words('Let $a_1 + b_2$ stand.');
        const math = parts.find(w => w instanceof $Formula) as $Formula;
        expect(math.copy).toBe('a_1 + b_2');
        // No emphasis mark was ever produced from inside the formula.
        expect(parts.map(p => p.copy)).not.toContain('_');
    });

    it('a stop inside a code span does not end the sentence', () => {
        const s = section('Call `x.y()` now. Then stop.');
        expect(s.parts()[1].parts().length).toBe(2);
    });

    it('an escaped mark is one mentioned part, so the mark it prevents never appears', () => {
        const parts = words('A \\* star that is not emphasis.');
        expect(parts.map(p => p.copy)).toContain('\\*');
    });
});

describe('the framework does not say the word', () => {
    it('a section speaks the notation itself — there is no kind of section that does', () => {
        const s = section('## A Heading\n\nProse.');
        // The title the notation made is a plain $Title and the section a plain
        // $Section. Nothing anywhere names a notation.
        expect(s.parts()[1].constructor.name).toBe('$Title');
        expect(s.constructor.name).toBe('$Section');
    });
});

describe('ONLY A BLANK LINE DIVIDES PROSE', () => {
    it('three lines under single newlines are ONE paragraph — a stanza, not three', () => {
        const s = section('This sentence\nThis sentence next\nThis sentence after');
        const prose = s.parts().slice(1);
        expect(prose.length).toBe(1);
        expect(prose[0].copy).toContain('This sentence next');
        expect(prose[0].copy).toContain('This sentence after');
    });

    it('and a blank line between them makes three', () => {
        const s = section('This sentence\n\nThis sentence next\n\nThis sentence after');
        expect(s.parts().slice(1).length).toBe(3);
    });

    it('a quotation broken over several lines is one quoted paragraph', () => {
        const s = section('> the first line\n> the second line\n> the third');
        const quoted = s.parts().filter(p => p instanceof $Paragraph && p.mark === '>');
        expect(quoted.length).toBe(1);
        expect(quoted[0].copy).toContain('the first line');
        expect(quoted[0].copy).toContain('the third');
        // The angle is syntax and never enters the words.
        expect(quoted[0].words.map(w => w.copy)).not.toContain('>');
    });

    it('but a list is many parts, because the notation marks each item', () => {
        const s = section('- one\n- two\n- three');
        expect(s.parts().filter(p => p instanceof $Paragraph && p.mark !== '').length).toBe(3);
    });
});
