import { Append, Chapter, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Project's Page ]]</Title>
        <Section>
            <Heading>The sketch of the parts</Heading>
            <Paragraph>
                The first sketch of the project's page asks how the five parts of a project — specification,
                identification, justification, intuition, progress — stand on one page in their own forms, with
                views chosen instead of scrolled. It is built from Sprint 130's own record, the sprint rendered
                as its own exploration. The views bar shows all of the parts or one; two squares in the toggle's
                dress switch the layers — annotations, the page's object model drawn: every justification, the
                connecting principle and the Archive strike are data, a relation drawing at both of its ends
                with its one writing, the coverage computed from what no relation claims; and references, the
                citations that join the parts and drain to ink when hidden. Each section's heading carries a
                small square that toggles its own annotations, and the bar's square is every section's at
                once. The specification renders its clauses in the literal markdown
                of <Means>$[[ Our Reference / The Specification ]]</Means>, coverage in the margin reading
                satisfied or open; the identification is five anchored statements, each the form a part takes, a
                justified statement ruled at its left; the intuition is a small graph of principles, stated so they
                can be compared, where a relationship between two principles is itself a principle; the progress is a
                journal of bylined, dated entries, one really struck by the Archive mark that closed it. The
                forms: registers, each part in the voice its meaning first suggested — legal, formal, essay,
                journal; and integrated, on my word mid-sketch that everything in the project part should at
                least share a font, though not necessarily in markdown form — the parts in one source face, the
                markdown's dashes gone, its marks softened, the whole smoother and subtler. And the structure
                underneath is interactive: a press on a justification's mark turns the page into that
                justification in its own right — its clauses, possibly several, and its entry travelling to
                stand face to face with the argument between them — and a press on the connecting principle
                stands the edge between its ends; the page is one projection of the project's graph, and a
                press moves to another.
            </Paragraph>
            <Paragraph>
                What the sketch found: a dotted underline across a justified statement read loud and became the
                pale rule at its left; with references off the teal drains to ink and every part still reads
                whole, which is the test that references are connection and not content; a citation pressed in
                one view turns the page to all of them and lands on its target, the two-way navigation a
                coverage view will need; the margin marks have no phone answer yet, since at the phone's width
                there is no margin to stand in; and the struck entry keeps its strike when the annotation layer
                is off, the strike being the entry's state and the note only its explanation. When the marks moved into
                the object model, the computed coverage corrected the hand: clause 4.2, written open, is
                claimed by J3 and the model says so. A ruling fell on
                hierarchy as the sketch was photographed: the title of a section needs to be more important, and
                markdown's own headings should hardly exceed the body — a little bold, not much, partially
                rendered — said for this page and for the arithmetic specification alike, so the correction
                went into <Means>$[[ Our Reference / The Content ]]</Means> in the same stroke. Nothing else
                here moved into the manual or the record's specification.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs of the parts</Heading>
            <Paragraph>
                <Image>![[ the-parts-registers-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-integrated-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-specification-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-identification-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-intuition-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-progress-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-bare-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-justification-opened-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ the-parts-edge-opened-desk.png ]]</Image>
            </Paragraph>
        </Section>
        <Append
            identifier="the-parts"
            type=".html"
        >
            ![[ the-parts.html ]]
        </Append>
    </Chapter>
);
