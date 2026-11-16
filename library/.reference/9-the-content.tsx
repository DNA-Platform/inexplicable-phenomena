import { Append, Chapter, Code, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Content ]]</Title>
        <Paragraph>
            A thing with a front and a back, lifted to the library level on 17 November 2026 because content
            with a project will stand in a lot of places. On the front the deliverable — the result of the
            effort, looking like what it is. On the back the project — the formal representation of the work,
            whose specification takes the form of <Means>$[[ ./The Specification ]]</Means>. The first case
            and the mathematics specialization stand
            in <Means>$[[ The Content ]]( Mathematical Reference / The Content )</Means>.
        </Paragraph>
        <Section>
            <Heading>1. The content</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back, and shows one side at a time.</Line>
                <Line>1.2 The front is the deliverable; the back is the project. One unlabelled control at the title's right flips them, explored rather than read.</Line>
                <Line>1.3 It opens on the deliverable; the canonical side is overridable.</Line>
                <Line>1.4 On the back the title turns into the literal — # Title in the source face, flush with the column — and that is the back's whole signal.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The project</Heading>
            <Paragraph>
                <List />
                <Line>2.1 The specification and the progress are the project's named parts, sections naming themselves; nothing is mandatory, and the parts stand open and whole — nothing collapses.</Line>
                <Line>2.2 The project's documents render verbatim through the markdown of the package, the specification in the source pane's register — the editor's face at the measured same-space settings, equations typeset into native MathML at bind time.</Line>
                <Line>2.3 The documents are highly connected: the renderer speaks the specification's own citation language, every mention a link to its definition across the documents, and a citation click turns the page itself, never the address.</Line>
                <Line>2.4 The implementation cites the specification by number or label, and the citation flips the content to the part it names — the relationship between the two forms.</Line>
                <Line>2.5 What is specified and not yet found stands interpolated, a word for the thing until the thing is found.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. The motion</Heading>
            <Paragraph>
                <List />
                <Line>3.1 The flip is a permutation that preserves identity: one axis turns, writing to code; boxes, weights, gaps, palette and structure ride through unchanged, measured by rectangle.</Line>
                <Line>3.2 The transition is the plain text version of one: the chapter settles from dimmed ink, and the title's discrete changes — font, place, mark — happen together at the dip's hidden trough, dimmed by color so the chapter's label changes with nothing.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>4. The components</Heading>
            <Paragraph>
                <List />
                <Line>4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification and Progress, its named parts.</Line>
                <Line>4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Interpolated, the placeholder.</Line>
                <Line>4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. The open ends</Heading>
            <Paragraph>
                <List />
                <Line>5.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package.</Line>
                <Line>5.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around.</Line>
                <Line>5.3 The justifications associate with the progress; the exact tie stands open.</Line>
            </Paragraph>
        </Section>
        <Code
            identifier="code"
            type=".tsx"
        />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
