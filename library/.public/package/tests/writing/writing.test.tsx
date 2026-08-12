import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { $Paragraph } from '@/writing/Paragraph';
import { $Chapter, Chapter } from '@/book/Chapter';
import { Title } from '@/writing/Title';
import { $Author, Author } from '@/book/Author';

class $Plate extends $Paragraph {
    view(): React.ReactNode { return <div className="plate">plate</div>; }
    valid(): boolean { return true; }
}
const Plate = $($Plate);

describe('writing: the bond keeps the whole sequence', () => {
    it('a section holding a part between paragraphs keeps every argument', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nBefore.'}{'\n\n'}<Plate>a</Plate>{'\n\nAfter.'}</Section>
        );
        expect(section.copy).toContain('Before.');
        expect(section.copy).toContain('After.');
    });

    it('the written part stands among the section\'s elements', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nBefore.'}{'\n\n'}<Plate>a</Plate>{'\n\nAfter.'}</Section>
        );
        expect(section.elements.some(e => e instanceof $Plate)).toBe(true);
    });

    it('a section of prose alone is unchanged', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nOne.'}{'\n\nTwo.'}</Section>
        );
        expect(section.parts().map(p => p.copy)).toEqual(['Heading', 'One.', 'Two.']);
    });

    it('the part is drawn, and so is the prose after it', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nBefore.'}{'\n\n'}<Plate>a</Plate>{'\n\nAfter.'}</Section>
        );
        const { container } = render(React.createElement($(section) as any));
        expect(container.innerHTML).toContain('plate');
        expect(container.innerHTML).toContain('After.');
    });
});

describe('writing: only the right kind of part is read', () => {
    // A written part is recognised by two facts: it is AT the level below, and
    // it is not inline. An author's name IS a sentence, but it sits inside one.
    it('an author written inline in prose is no part of the section holding it', () => {
        const section: $Section = $(
            <Section><Title>The Book</Title>{'\n\nA book about reading. '}<Author>The Team</Author>{' and more.'}</Section>
        );
        const paragraph = section.parts()[1];
        expect(paragraph.parts().some(s => s instanceof $Author)).toBe(false);
        expect(section.parts().some(p => p instanceof $Author)).toBe(false);
    });

    it('a part written at the level below stands where it was written', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nBefore.'}{'\n\n'}<Plate>a</Plate>{'\n\nAfter.'}</Section>
        );
        const kinds = section.parts().map(p => p instanceof $Plate ? 'plate' : 'prose');
        expect(kinds).toEqual(['prose', 'prose', 'plate', 'prose']);
    });

    it('every level counts from zero, because position is the only numbering', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nOne two.'}{'\n\nThree.'}</Section>
        );
        // Composed parts are built fresh by each reading, so a location stands for
        // the same WRITING at that position rather than the same object.
        const paragraphs = section.parts();
        paragraphs.forEach((p, at) => expect(section.at(at).read().copy).toBe(p.copy));
        const sentences = paragraphs[1].parts();
        sentences.forEach((s, at) => expect(paragraphs[1].at(at).read().copy).toBe(s.copy));
        const words = sentences[0].parts();
        expect(words.length).toBe(4);
        words.forEach((w, at) => expect(sentences[0].at(at).read().copy).toBe(w.copy));
    });

    it('mentioning propagates — a mention keeps its letters, and they are mentioned too', () => {
        const section: $Section = $(
            <Section><Title>Heading</Title>{'\n\nOne two.'}</Section>
        );
        const sentence = section.parts()[1].parts()[0];
        const mentioned = sentence.parts().filter(w => w.role === 'mention');
        expect(mentioned.length).toBeGreaterThan(0);
        // A quoted word still has its letters; quoting does not dissolve them.
        // Every grapheme in the writing stays addressable, which is what the
        // letter floor promises.
        const stop = mentioned.find(m => m.copy === '.')!;
        expect(stop.parts().length).toBe(1);
        expect(stop.parts().every(l => l.role === 'mention')).toBe(true);
        // And the reading is untouched: the words are the used ones.
        expect(sentence.words.every(w => w.role === 'use')).toBe(true);
        expect(sentence.words.map(w => w.copy)).toEqual(['One', 'two']);
    });
});

describe('writing: a document writes its sections once', () => {
    it('the sections the model holds are the sections that are drawn', () => {
        let built = 0;
        class $Counted extends $Section {
            $Section(...writing: unknown[]) {
                super.$Section(...writing);
                built++;
            }
        }
        const Counted = $($Counted);
        class $Written extends $Chapter {
            view(): React.ReactNode {
                return (
                    <>
                        <Counted><Title>A Chapter</Title>{'\n\nProse.'}</Counted>
                        <Counted parenthetical><Title>Summary</Title>{'\n\nA line.'}</Counted>
                    </>
                );
            }
        }
        const Written = $($Written);

        const chapter: $Written = $(<Written />);
        const written = built;
        const held = chapter.parts();
        expect(written).toBe(2);

        render(React.createElement($(chapter) as any));
        expect(built).toBe(written);
        expect(chapter.parts()[0]).toBe(held[0]);
    });

    it('a document handed its sections builds no others', () => {
        const chapter: $Chapter = $(
            <Chapter>
                <Section><Title>Given</Title>{'\n\nProse.'}</Section>
                <Section parenthetical><Title>Summary</Title>{'\n\nA line.'}</Section>
            </Chapter>
        );
        expect(chapter.parts().length).toBe(2);
        expect(chapter.summary?.heading).toBe('Summary');
    });
});
