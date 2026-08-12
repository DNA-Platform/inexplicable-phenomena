import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { $Figure, Figure } from '@/writing/Figure';
import { Link } from '@/reference/Link';
import { $Paragraph } from '@/writing/Paragraph';
import { $MarkdownSection, MarkdownSection } from './section';
import { $Code } from '@/writing/Code';
import { $Link } from '@/reference/Link';
import { $Formula } from '@/writing/Formula';
import { $Snippet } from '@/writing/Snippet';

// A PARALLEL TEXT — one text, two settings, side by side so the readings
// can be compared. The facing-page edition is an old book, and this is that
// book: the same content set once by hand and once in a notation.
//
// NAME IS A PROXY and flagged. "Parallel text" is the domain's own word for a
// facing-page edition; nothing here is coined.
//
// On the left a REGULAR section, hand-written, carrying its parts as WRITTEN
// elements. On the right the same text in markdown, where the same parts are
// FOUND by the notation. Both parts lists stand beside their prose.
//
// The claim: a written part and a found part are the same thing. The lists
// agree except where markdown recognised a pairing — and every part the
// notation adds beyond the plain parse is a MENTION, so the READING is
// identical even where the counts are not.

const sample = 'The value 2 * 3 stands unchanged. A fence follows, and after it a link.';

class $Plate extends $Figure {
    drawn(): ReactNode { return <Rule />; }
}
const Plate = $($Plate);

// The regular side: nothing is found, everything is written in by hand.
// The plate carries NO caption. A caption is writing and would be counted; a
// fence's content is not writing and is not. Giving one side a caption made the
// two sides different texts, and the twin said so on screen before anyone read
// it — which is what a corroborating view is for.
export const written = (): $Section => $(
    <Section>
        <Title>Written by hand</Title>
        {`\n\n${sample.split(' A fence')[0]}`}
        <Plate />
        {'\n\nA fence stood above. After it a '}
        <Link url="/somewhere">a link</Link>
        {' inside this sentence.'}
    </Section>
);

// The markdown side: the same text, and the notation finds what the other side
// had to be handed.
export const found = (): $MarkdownSection => $(
    <MarkdownSection>
        <Title>Found in the notation</Title>
        {`\n\n${sample.split(' A fence')[0]}\n\n\`\`\`text\na plate, drawn from a fence\n\`\`\`\n\nA fence stood above. After it a [a link](/somewhere) inside this sentence.`}
    </MarkdownSection>
) as $MarkdownSection;

const kindOf = (part: $Paragraph | $Section): string => {
    if (part instanceof $Code) return 'figure';
    if (part instanceof $Figure) return 'figure';
    if (part instanceof $Section) return 'section';
    return 'paragraph';
};

// An address is where a part STANDS — its position in what composes it. Nothing
// carries a number, so the address is read off the walk rather than off the part.
const rows = (section: $Section): ReactNode =>
    section.parts().map((part, at) => (
        <React.Fragment key={at}>
            <Row>
                <At>{at}</At>
                <Kind>{kindOf(part)}</Kind>
                <Copy>{(part.copy || (part as $Code).source || '—').slice(0, 40)}</Copy>
            </Row>
            {kindOf(part) !== 'paragraph' ? null : (part as $Paragraph).sentences.map((s, si) => {
                const points = s.parts().filter(w => w instanceof $Link || w instanceof $Formula || w instanceof $Snippet);
                if (!points.length) return null;
                return points.map((w, k) => (
                    <Row key={`${at}-${si}-${k}`} $under>
                        <At>{`${at}.${si}`}</At>
                        <Kind>{w instanceof $Link ? 'reference' : 'drawn'}</Kind>
                        <Copy>{w.copy.slice(0, 40)}</Copy>
                    </Row>
                ));
            })}
        </React.Fragment>
    ));

const reading = (section: $Section) => ({
    parts: section.parts().length,
    words: section.words.length,
    mentioned: section.paragraphs.flatMap(p => p.sentences).flatMap(s => s.parts()).filter(w => w.role === 'mention').length,
});

export function Parallel(): React.ReactElement {
    const left = written();
    const right = found();
    const a = reading(left);
    const b = reading(right);
    return (
        <Field>
            <Head>One text · set two ways · two readings that agree</Head>
            <Pair>
                <Side>
                    <SideName>written by hand — the parts are handed to the section</SideName>
                    <Prose>{left.copy}</Prose>
                    <List>{rows(left)}</List>
                    <Sum>{`${a.parts} parts · ${a.words} words · ${a.mentioned} mentioned`}</Sum>
                </Side>
                <Side>
                    <SideName>found in markdown — the notation finds the same parts</SideName>
                    <Prose>{right.copy}</Prose>
                    <List>{rows(right)}</List>
                    <Sum>{`${b.parts} parts · ${b.words} words · ${b.mentioned} mentioned`}</Sum>
                </Side>
            </Pair>
            <Note>
                {a.words === b.words
                    ? `The readings agree: ${a.words} words on both sides. The part counts differ by ${Math.abs(a.parts - b.parts)}, and every part the notation adds is a mention.`
                    : `The readings DISAGREE — ${a.words} words against ${b.words}. That is a defect, and this line is how it is seen.`}
            </Note>
        </Field>
    );
}

const Field = styled.div`
    width: min(1180px, 100%);
    font-family: ui-monospace, Menlo, Consolas, monospace;
    color: #cdd5f5;
`;

const Head = styled.div`
    font-size: 10.5px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #7a86b8;
    text-align: center;
    margin-bottom: 22px;
`;

const Pair = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;

    @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Side = styled.div`
    background: linear-gradient(168deg, #141a33 0%, #10142a 100%);
    border: 1px solid #2c3358;
    border-radius: 12px;
    padding: 20px 22px 16px;
    min-width: 0;
`;

const SideName = styled.div`
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a86b8;
    margin-bottom: 14px;
`;

const Prose = styled.div`
    font-family: Georgia, 'Iowan Old Style', serif;
    font-size: 14px;
    line-height: 1.7;
    color: #e6eaff;
    white-space: pre-line;
    padding-bottom: 14px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(44, 51, 88, 0.7);
`;

const List = styled.div``;

const Row = styled.div<{ $under?: boolean }>`
    display: grid;
    grid-template-columns: 3.2rem 5.5rem minmax(0, 1fr);
    gap: 10px;
    font-size: 11.5px;
    padding: 4px 0 4px ${(p) => (p.$under ? '1.4rem' : '0')};
    opacity: ${(p) => (p.$under ? 0.78 : 1)};
`;

const At = styled.span`color: #ffd27a;`;
const Kind = styled.span`color: #9fd0ff;`;
const Copy = styled.span`
    color: #aab4e8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Sum = styled.div`
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(44, 51, 88, 0.7);
    font-size: 11px;
    color: #7a86b8;
`;

const Note = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 11.5px;
    line-height: 1.7;
    color: #9fd0ff;
`;

const Rule = styled.hr`
    border: 0;
    border-top: 1px solid rgba(205, 213, 245, 0.35);
    margin: 0;
`;
