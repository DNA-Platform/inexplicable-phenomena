import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { text } from '@/utilities/html';
import { $Writing } from '@/writing/Writing';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $Paragraph } from '@/writing/Paragraph';
import { $Figure } from '@/writing/Figure';
import { $Sentence } from '@/writing/Sentence';
import { $Word, Word } from '@/writing/Word';
import { $Phrase } from '@/writing/Phrase';
import { $Author, Author } from '@/book/Author';
import { $Letter } from '@/writing/Letter';
import { $Chapter, Chapter } from '@/book/Chapter';

// THE PARSE KNOWS NO CLASS NAMES. It asks a part what LEVEL it is written at,
// and `level` is inherited — so a kind the model has never heard of is handled
// by the walk without the walk being told anything about it. These promises fail
// if the parse ever starts asking what something IS instead of where it stands.

// A section kind of the demo's own — one level of derivation.
class $Dressed extends $Section {
    $dress = 'plain';
    get dress(): string { return this.$dress; }
}
const Dressed = $($Dressed);

// And one derived from THAT — two levels down, still a section.
class $Fancy extends $Dressed {
    get dress(): string { return 'fancy'; }
}
const Fancy = $($Fancy);

// A paragraph kind, and a kind derived from it — the same question one grade down.
class $Plate extends $Figure {
    $content = '';
    get content(): string { return this.$content; }
    drawn(): React.ReactNode { return this.content ? <pre>{this.content}</pre> : null; }
    valid(): boolean { return this.content !== '' || this.caption.copy !== ''; }
}
const Plate = $($Plate);

class $Listing extends $Plate {
    get kind(): string { return 'listing'; }
}
const Listing = $($Listing);

describe('derived kinds are parsed by their LEVEL, never by their class', () => {
    // A SECTION COMPOSES PARAGRAPHS, so the derived kind that stands in one is a
    // derived PARAGRAPH. The law is unchanged — level decides, never class — and
    // this is it demonstrated at the grade a section actually accepts.
    it('a derived PARAGRAPH written into a section stands as a part of it', () => {
        const outer: $Section = $(
            <Section><Title>Outer</Title>{'\n\nBefore.'}
                <Plate content="x" />
                {'\n\nAfter.'}
            </Section>
        );
        const held = outer.parts().find(p => p instanceof $Plate) as $Plate;
        expect(held).toBeDefined();
        expect(held.content).toBe('x');
        expect(outer.parts().map(p => p.copy)).toContain('Before.');
        expect(outer.parts().map(p => p.copy)).toContain('After.');
    });

    it('a kind derived from a derived kind is handled the same — depth of inheritance is not a case', () => {
        const outer: $Section = $(
            <Section><Title>Outer</Title>{'\n\nProse.'}
                <Listing content="y" />
            </Section>
        );
        const held = outer.parts().find(p => p instanceof $Listing) as $Listing;
        expect(held).toBeDefined();
        expect(held.kind).toBe('listing');
        expect(held.level).toBe('paragraph');
    });

    it('a derived PARAGRAPH stands too, and so does one derived from it', () => {
        const section: $Section = $(
            <Section><Title>Figures</Title>{'\n\nBefore.'}
                <Plate content="a plate" />
                <Listing content="const a = 1;" />
                {'\n\nAfter.'}
            </Section>
        );
        const parts = section.parts();
        expect(parts.filter(p => p instanceof $Plate).length).toBe(2);
        expect(parts.filter(p => p instanceof $Listing).length).toBe(1);
        // Standing where they were written, with the prose counting around them.
        const kinds = parts.map(p =>
            p instanceof $Listing ? 'listing' : p instanceof $Plate ? 'plate' : 'prose');
        expect(kinds).toEqual(['prose', 'prose', 'plate', 'listing', 'prose']);
    });

    it('the walk names no class — level is the only question it asks', () => {
        // A kind the walk has never been told about behaves exactly like the
        // base level it derives from, because `level` is what it inherits.
        const dressed: $Dressed = $(<Dressed><Title>Anything</Title>{'\n\nProse.'}</Dressed>);
        expect(dressed.level).toBe('section');
        expect(dressed.accepts).toEqual(['paragraph']);
        const plate: $Plate = $(<Plate content="x" />);
        expect(plate.level).toBe('paragraph');
        expect(plate.accepts).toEqual(['sentence']);
    });
});

describe('the parse does not judge what it composes', () => {
    // A section whose every composed part refuses to be valid. Before, the parse
    // dropped these and logged a warning nobody read, so the parts were shorter
    // than the writing and the model quietly disagreed with the page.
    class $Refusing extends $Section {
        compose(prose: string): $Paragraph {
            class $Never extends $Paragraph { valid(): boolean { return false; } }
            const Never = $($Never);
            return $(<Never>{prose}</Never>);
        }
    }
    const Refusing = $($Refusing);

    it('a part that will not validate STAYS in the parts — it is a validation failure, not debris', () => {
        const s: $Refusing = $(<Refusing><Title>Refusing</Title>{'\n\nOne.'}{'\n\nTwo.'}</Refusing>);
        const parts = s.parts();
        // Three pieces were written; three parts are held, none silently gone.
        expect(parts.length).toBe(3);
        // The title was WRITTEN, so it stands as itself and is valid. The two
        // composed parts refuse — and they are still here, carrying that refusal.
        expect(parts[0].valid()).toBe(true);
        expect(parts.slice(1).every(p => !p.valid())).toBe(true);
    });

    it('and an empty piece is still not a piece, while a WHITESPACE one is', () => {
        const s: $Section = $(<Section><Title>Spacing</Title>{'\n\n\n\nOne two.'}</Section>);
        // No empty paragraph was composed from the extra blank line.
        expect(s.parts().length).toBe(2);
        // But the space between two words is syntax, and syntax is present.
        const sentence = s.parts()[1].parts()[0];
        expect(sentence.parts().map(w => w.copy)).toContain(' ');
        expect(sentence.letters.map(l => l.copy).join('')).toBe(sentence.copy);
    });

    it('the word laws admit what a person writes', () => {
        const s: $Section = $(<Section><Title>Words</Title>{'\n\nThe token 33A3a-112and-skjdfh stands here.'}</Section>);
        expect(s.words.map(w => w.copy)).toContain('33A3a-112and-skjdfh');
        // And a hyphen joins rather than divides: it is one word, not three.
        expect(s.words.filter(w => w.copy.includes('-')).length).toBe(1);
    });
});

describe('a name is a phrase, not a sentence', () => {
    it('an author written mid-paragraph leaves the sentence count at ONE', () => {
        const s: $Section = $(
            <Section><Title>Named</Title>{'\n\nWritten by '}<Author>Doug Rubino</Author>{' in the margin.'}</Section>
        );
        const paragraph = s.parts()[1] as $Paragraph;
        // One sentence, not three. A name sits inside a sentence; it never
        // stands as one, and the level it declares is what says so.
        expect(paragraph.parts().length).toBe(1);
        expect(paragraph.parts().every(p => p instanceof $Sentence)).toBe(true);
    });

    it('a phrase is word grade and admits what a name contains', () => {
        const name: $Author = $(<Author>Doug Rubino</Author>);
        expect(name.level).toBe('word');
        expect(name).toBeInstanceOf($Phrase);
        expect(name).toBeInstanceOf($Word);
        // One word, with a space in it — the fallback Doug named, and it needs
        // no machinery a part that flattens into several would need.
        expect(name.valid()).toBe(true);
        // A plain word still refuses a space, so the widening is the phrase's.
        expect(($(<Word>{'two words'}</Word>) as $Word).valid()).toBe(false);
    });
});

describe('the parse reaches every level, and the counts agree from any altitude', () => {
    const chapter = (): $Chapter => $(
        <Chapter>
            <Section><Title>One</Title>{'\n\nFirst sentence here. Second one follows.'}</Section>
            <Section><Title>Two</Title>{'\n\nA third sentence stands alone.'}</Section>
            <Section parenthetical><Title>Summary</Title>{'\n\nIn brief.'}</Section>
        </Chapter>
    );

    it('document to section to paragraph to sentence to word to letter — each level composes the one below', () => {
        const c = chapter();
        expect(c.parts().every(s => s instanceof $Section)).toBe(true);
        expect(c.parts()[0].parts().every(p => p instanceof $Paragraph)).toBe(true);
        const paragraph = c.parts()[0].paragraphs[1];
        expect(paragraph.parts().every(s => s instanceof $Sentence)).toBe(true);
        const sentence = paragraph.parts()[0];
        expect(sentence.parts().every(w => w instanceof $Word)).toBe(true);
        const word = sentence.words[0];
        expect(word.parts().every(l => l instanceof $Letter)).toBe(true);
        expect(word.parts()[0].parts()).toEqual([]);
    });

    it('one count, whichever altitude it is reached from — the reading cannot disagree with itself', () => {
        const c = chapter();
        const fromChapter = c.words.length;
        const fromSections = c.sections.flatMap(s => s.words).length;
        const fromParagraphs = c.sections.flatMap(s => s.paragraphs).flatMap(p => p.words).length;
        const fromSentences = c.sections
            .flatMap(s => s.paragraphs)
            .flatMap(p => p.sentences)
            .flatMap(s => s.words).length;
        expect(fromChapter).toBe(fromSections);
        expect(fromChapter).toBe(fromParagraphs);
        expect(fromChapter).toBe(fromSentences);
        expect(fromChapter).toBeGreaterThan(0);
    });

    it('and the letters give the writing back — the floor loses nothing', () => {
        const c = chapter();
        const sentence = c.sections[0].paragraphs[1].parts()[0];
        expect(sentence.letters.map(l => l.copy).join('')).toBe(sentence.copy);
    });

    it('the flat readings reach a derived paragraph standing in a section', () => {
        const outer: $Section = $(
            <Section><Title>Outer</Title>{'\n\nOuter prose here.'}
                <Plate content="x" />
            </Section>
        );
        expect(outer.paragraphs.map(p => p.copy)).toContain('Outer prose here.');
        expect(outer.words.map(w => w.copy)).toContain('Outer');
        expect(outer.letters.length).toBeGreaterThan(0);
    });
});

describe('the parse threads lineage, and a scope can reach through it', () => {
    it('a composed part is held BY what composed it, all the way down', () => {
        const s: $Section = $(<Section><Title>Lineage</Title>{'\n\nOne two.'}</Section>);
        const paragraph = s.parts()[1] as $Paragraph;
        expect(paragraph.parent).toBe(s);
        const sentence = paragraph.parts()[0];
        expect(sentence.parent).toBe(paragraph);
        const word = sentence.parts()[0];
        expect(word.parent).toBe(sentence);
        expect(word.parts()[0].parent).toBe(word);
    });

    it('mentioning propagates BY LINEAGE — nothing is written to say so', () => {
        const s: $Section = $(<Section><Title>Quoting</Title>{'\n\nOne two.'}</Section>);
        const sentence = (s.parts()[1] as $Paragraph).parts()[0];
        const stop = sentence.parts().find(w => w.copy === '.')!;
        expect(stop.role).toBe('mention');
        // Its letters are mentioned because IT is, and no part carries an
        // assignment saying so — the parse writes nothing at all now.
        expect(stop.parts().every(l => l.role === 'mention')).toBe(true);
        expect(stop.parts().every(l => l.$role === undefined)).toBe(true);
        // And the used words are untouched.
        expect(sentence.words.every(w => w.role === 'use')).toBe(true);
    });
});

// A REFERENCE MENTIONS ITS REFERENT. Doug, 2026-08-13: "The sentence reference
// is literal. Maybe you display the sentence as the reference in quotes?" So a
// reference is writing that draws what it stands for — named where the referent
// has a name, quoted where it has none, and MENTIONED in every case, because a
// reference presents its referent rather than saying what it says.
describe('a reference is writing, and what it draws is its referent mentioned', () => {
    const section = (prose: string): $Section =>
        $(<Section><Title>A Section</Title>{`\n\n${prose}`}</Section>);

    it('every reference form is writing one grade below what it stands for', () => {
        const s = section('One sentence here. And another.');
        const paragraph = s.parts()[1];
        expect(s.ref).toBeInstanceOf($Paragraph);
        expect(paragraph.ref).toBeInstanceOf($Sentence);
        expect(paragraph.parts()[0].ref).toBeInstanceOf($Word);
        expect(paragraph.parts()[0].parts()[0].ref).toBeInstanceOf($Letter);
    });

    it('a reference MENTIONS — it does not use', () => {
        const s = section('One sentence here.');
        expect(s.ref.role).toBe('mention');
        expect(s.parts()[1].ref.role).toBe('mention');
        expect(s.parts()[1].parts()[0].ref.role).toBe('mention');
    });

    it('a sentence reference draws the sentence IN QUOTES, because a sentence has no name', () => {
        const s = section('One sentence here.');
        const sentence = s.parts()[1].parts()[0];
        expect(text(sentence.ref.view())).toBe('\u201cOne sentence here.\u201d');
        expect(sentence.ref.copy).toBe('One sentence here.');
    });

    it('a section reference draws its HEADING, because a section has a name', () => {
        const s = section('Prose beneath.');
        expect(text(s.ref.view())).toBe(s.copy);
        expect(text(s.ref.view())).not.toContain('\u201c');
    });
});
