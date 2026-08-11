import React from 'react';
import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $MarkdownSentence, MarkdownSentence, $Pointing, $Inline } from './sentence';

const md = (copy: string): $MarkdownSentence => $(<MarkdownSentence>{copy}</MarkdownSentence>);
const plain = (copy: string): $Sentence => $(<Sentence>{copy}</Sentence>);

const reading = (s: $Sentence) => ({
    parts: s.parts().map(p => p.copy),
    words: s.words.map(w => w.copy),
});

describe('a markdown sentence — syntax is mentioned, content is used', () => {
    it('AE1 — a bold pair holds its marks as parts and passes over them as words', () => {
        const s = md('a **bold** word');
        expect(s.parts().map(p => p.copy)).toContain('**');
        expect(s.words.map(w => w.copy)).toEqual(['a', 'bold', 'word']);
    });

    it('AE13 — role is still exactly use or mention; no third value appears', () => {
        const s = md('a **bold** word and `code`');
        for (const part of s.parts()) expect(['use', 'mention']).toContain(part.role);
    });

    it('an inline code span is CONTENT THAT IS NOT WRITING, so it is a part and not a word', () => {
        const s = md('call `parts()` on it');
        const span = s.parts().find(p => p instanceof $Inline) as $Inline;
        expect(span.kind).toBe('code');
        expect(span.content).toBe('parts()');
        // The model refused it as a word before we decided anything: $Word
        // demands letters, and source has parens.
        expect(s.words.map(w => w.copy)).toEqual(['call', 'on', 'it']);
    });

    it('R12 — an escape and the mark it escapes are ONE mentioned part', () => {
        const s = md('a literal \\* here');
        const marks = s.parts().filter(p => p.role === 'mention').map(p => p.copy);
        expect(marks).toContain('\\*');
        expect(s.words.map(w => w.copy)).toEqual(['a', 'literal', 'here']);
    });
});

describe('a markdown link — the target is a pointer, and a pointer is not writing', () => {
    it('R4 — a link is a part of the sentence that holds it', () => {
        const s = md('see [the entry](https://x.com) for more');
        expect(s.parts().some(p => p instanceof $Pointing)).toBe(true);
    });

    it('AE10 — its text is counted; its URL is not', () => {
        const s = md('see [the entry](https://x.com) for more');
        const words = s.words.map(w => w.copy);
        expect(words).toContain('the entry');
        expect(words).not.toContain('https');
        expect(words).not.toContain('x');
        expect(words).not.toContain('com');
    });

    it('the link keeps its target, and reads to a place', () => {
        const s = md('see [the entry](https://x.com) now');
        const pointing = s.parts().find(p => p instanceof $Pointing) as $Pointing;
        expect(pointing.url).toBe('https://x.com');
        expect(pointing.copy).toBe('the entry');
    });
});

describe('inline mathematics — content that is not writing', () => {
    it('a formula is a part, and it is not among the words', () => {
        const s = md('the circle $x^2 + y^2$ closes');
        const formula = s.parts().find(p => p instanceof $Inline) as $Inline;
        expect(formula).toBeDefined();
        expect(formula.kind).toBe('math');
        expect(formula.content).toBe('x^2 + y^2');
        expect(s.words.map(w => w.copy)).toEqual(['the', 'circle', 'closes']);
    });
});

describe('AE9 — the unpaired mark, read against the regular section as its oracle', () => {
    // The expectation is NOT hand-written. The plain sentence IS the expectation,
    // so it cannot drift; a differential alone could hide a bug both notations
    // share, which is why the absolute above (AE1) is pinned separately.
    it('2 * 3 READS identically in both notations', () => {
        const copy = 'the value 2 * 3 stands';
        expect(md(copy).words.map(w => w.copy)).toEqual(plain(copy).words.map(w => w.copy));
        expect(md(copy).copy).toEqual(plain(copy).copy);
    });

    // Markdown's divide is FINER — it isolates the asterisk as a candidate mark
    // where plain prose keeps ' * ' as one run. So the part COUNTS differ, and
    // the honest claim is not that they are equal but that every part markdown
    // adds beyond the plain parse is a MENTION. The reading is untouched, which
    // is what agreement between two notations actually means.
    it('every part markdown adds beyond the plain parse is a mention', () => {
        const copy = 'the value 2 * 3 stands';
        const marks = md(copy).parts().filter(p => p.role === 'mention').length;
        const plainMarks = plain(copy).parts().filter(p => p.role === 'mention').length;
        expect(md(copy).parts().length - plain(copy).parts().length).toBe(marks - plainMarks);
    });

    it('an unpaired asterisk is punctuation, and is never invalid', () => {
        const s = md('a lone * mark');
        const star = s.parts().find(p => p.copy === '*') as $Word;
        expect(star.role).toBe('mention');
        expect(star.valid()).toBe(true);
        expect(s.words.map(w => w.copy)).toEqual(['a', 'lone', 'mark']);
    });

    it('an unclosed bold marker renders literally rather than failing', () => {
        const s = md('an **unclosed run');
        expect(s.valid()).toBe(true);
        expect(s.words.map(w => w.copy)).toEqual(['an', 'unclosed', 'run']);
    });

    it('prose with no markdown in it parses exactly as a plain sentence does', () => {
        expect(reading(md('Nothing special happens here.'))).toEqual(reading(plain('Nothing special happens here.')));
    });
});
