import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { Document, Paragraph, Quote, Section, html } from '@dna-platform/public';
import { $Dialogue, $Exchange, Dialogue, Exchange, Participant, Topic } from '@dna-platform/public/conversation';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

// A PROMISE ASKS WHAT A WRITING ANSWERS, NEVER WHAT TYPE IT WAS HANDED, and these two helpers name
// no door type at all. `tsc -p src` compiles src from SOURCE and these promises against DIST, which
// are two type programs — so a class carried through one door is not nominally the class the other
// declares, whatever it is at runtime. Asking structurally is not a dodge: it is the reading a
// reader makes. What a part's kind is CALLED, and what class it WEARS, which is what the dress
// selects on too.
type Parted = { parts(): { kind: { name: string }; className: string }[] };

const named = (held: Parted): string[] => held.parts().map(part => part.kind.name);
const wearing = (held: Parted, kind: string): number => held.parts().filter(part => part.className.includes(kind)).length;

// AN EXCHANGE IS A SECTION AND ITS TYPE IS A SECTION TYPE, the same shape $Aside and $Quote have.
//
// AN EXCHANGE KEEPS THE WORDS OF A SECTION-GRADE SIBLING AND LOSES ITS KIND, and that is the open
// question of this design rather than a defect of it. $Composition.parts() keeps a part that is the
// holder's own kind or the level beneath; a quote is neither — it stands on the SAME RUNG as the
// exchange — so the parse treats it as prose and MAKES it into the level beneath. Nothing is lost
// but the blockquote.
//
// UNTIL 2026-09-16 THIS PROMISE READ `toContain('Quote')` AND PASSED, and it passed for a reason
// that was not the rule: Reflection declared `above` TWICE, the parent walk won on the prototype,
// and the level comparison parts() was written to make had never run. The dead one is deleted and
// this is what the rule actually does.
//
// DOUG'S TWO WAYS OUT, 2026-09-16, neither built: "Doesn't the exchange itself deserve to be a type
// of quote possibly? Or have the theme DI a type of paragraph. You know that part of a theme can be
// using DI to replace standard components in certain contexts." The second is the one that keeps the
// kind — a component is a scope in chemistry, so a conversation can re-point Quote at a
// paragraph-grade one and it is admitted.
describe('an exchange is found by its type and admits what a section admits', () => {
    it('AN EXCHANGE KEEPS THE WORDS OF A QUOTE, AND THE QUOTE LOSES ITS KIND', () => {
        const held = built<$Exchange>(
            <Exchange><Participant>[Doug](MY Library Log)</Participant>
                <Paragraph>He said it plainly.</Paragraph>
                <Quote>and the suffix is two suffixes</Quote>
            </Exchange>
        );
        expect(named(held)).toEqual(['Heading', 'Paragraph', 'Paragraph']);
    });

    it('AND ITS KIND IS THE EXCHANGE, chosen over the section it specialises', () => {
        const held = built<$Exchange>(<Exchange><Participant>[Doug](MY Library Log)</Participant>Said once.</Exchange>);
        expect(held.kind.name).toBe('Exchange');
    });

    it('AND IT IS STILL FOUND AS AN EXCHANGE among the parts of what holds it', () => {
        const held = built<Parted>(
            <Document>
                <Exchange><Participant>[Doug](MY Library Log)</Participant>He asked.</Exchange>
                <Exchange><Participant>[Claude](Claude and Our Projects)</Participant>It answered.</Exchange>
            </Document>
        );
        expect(wearing(held, 'pd-exchange')).toBe(2);
    });

    // AN EXCHANGE IS SUPPLIED A HEADING IT WAS NEVER WRITTEN WITH, recovered from its opening
    // sentence and elided at sixty characters, because ExchangeSpecification extends the section's
    // and inherits its `supplies`. WHETHER AN EXCHANGE SHOULD HAVE ONE AT ALL IS DOUG'S TO RULE —
    // Claude's chat draws none — and this promise is here so the answer is visible, not incidental.
    it('AND IT IS SUPPLIED A HEADING, because it is a section', () => {
        const held = built<$Exchange>(<Exchange><Participant>[Doug](MY Library Log)</Participant>He said it plainly.</Exchange>);
        expect(held.heading()).toBeDefined();
    });
});

// AN EXCHANGE IS A ROUND — Doug, 2026-09-16: "An exchange can have a sequence but generally one per
// conversation participant." So it names several, and HOW MANY is not a rule.
describe('an exchange is spoken', () => {
    it('AN EXCHANGE NOBODY SPOKE IS REFUSED', () => {
        const held = built<$Exchange>(<Exchange>Said by nobody at all.</Exchange>);
        expect(() => held.specify()).toThrow(/an exchange is spoken/u);
    });

    it('AND IT GENERALLY NAMES ONE PER PARTICIPANT', () => {
        const held = built<$Exchange>(
            <Exchange>
                <Participant>[Doug](MY Library Log)</Participant>
                <Participant>[Claude](Claude and Our Projects)</Participant>
                <Paragraph>He asked and it answered.</Paragraph>
            </Exchange>
        );
        expect(held.participants().length).toBe(2);
    });

    it('AND A PARTICIPANT SAYS ONE THING AND LEADS TO ANOTHER, at the address the compiler wrote', () => {
        const held = built<$Exchange>(<Exchange><Participant>[Claude](/claude-and-our-projects/)</Participant>It answered.</Exchange>);
        expect(html.text(held.participants()[0]?.path()?._block)).toBe('/claude-and-our-projects/');
    });
});

// A DIALOGUE IS A DOCUMENT — Doug, 2026-09-16: "Maybe Dialogue is the document and leave
// conversation as the folder and one-day name of the book." So it stands wherever a document
// stands, and it is the thing that knows the cast.
describe('a dialogue is a conversation, and it is a document', () => {
    it('ITS KIND IS THE DIALOGUE, chosen over the document it specialises', () => {
        expect(built<$Dialogue>(<Dialogue />).kind.name).toBe('Dialogue');
    });

    it('AND IT KNOWS THE CAST, declared once and not on every message', () => {
        const held = built<$Dialogue>(
            <Dialogue>
                <Participant>[Doug](/my-library-log/)</Participant>
                <Participant>[Claude](/claude-and-our-projects/)</Participant>
                <Exchange><Paragraph>He asked.</Paragraph></Exchange>
            </Dialogue>
        );
        expect(held.participants.map(one => html.text(one.path()?._block))).toEqual(['/my-library-log/', '/claude-and-our-projects/']);
    });

    // THE PAYOFF OF DOCUMENT GRADE, and it is measured rather than asserted: a dialogue stands where
    // a document stands, so a conversation can be quoted inside somebody else's page.
    it('AND IT STANDS INSIDE A SECTION, which is what document grade buys', () => {
        const held = built<Parted>(
            <Section>
                <Paragraph>He kept the whole exchange, which went like this.</Paragraph>
                <Dialogue><Exchange><Paragraph>Said.</Paragraph></Exchange></Dialogue>
            </Section>
        );
        expect(named(held)).toContain('Dialogue');
    });

    it('AND IT MAY CARRY MANY TOPICS', () => {
        const held = built<$Dialogue>(<Dialogue><Topic>Semantics of Types</Topic><Topic>What a Name Resolves To</Topic></Dialogue>);
        expect(held.topics.length).toBe(2);
    });

    it('AND CARRYING NONE IS LEGAL, because an unlabelled movement is still a movement', () => {
        expect(built<$Dialogue>(<Dialogue />).topics.length).toBe(0);
    });
});
