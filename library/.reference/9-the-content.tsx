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
                <Line>2.1 The project's named parts are the specification, the identification, the justification, the intuition and the progress — the order of the work itself. Sections name themselves, nothing is mandatory, and every part is independently viewable; the specification stands as an operable tree, The Specification's section 9.</Line>
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
                <Line>4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification, Identification, Intuition and Progress, its named parts in the order of the work — the justification is not a section, riding as annotations between the identification and the specification.</Line>
                <Line>4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Interpolated, the placeholder.</Line>
                <Line>4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. The annotations</Heading>
            <Paragraph>
                <List />
                <Line>5.1 Anything on a page can be annotated: whatever can be mentioned can carry an annotation, which finds its subject by mention, never by position or a runtime id.</Line>
                <Line>5.2 An annotation is writing said of a thing with a sort — Idea, Question, Revision, Archive, and the project's own, Justification among them. It is the infrastructure's annotation; there is no second species.</Line>
                <Line>5.3 A relation is a type of annotation between two things, finding both ends by mention: a justification relates an identification entry to a clause; a connecting principle relates two principles.</Line>
                <Line>5.4 An annotation is itself a thing — mentionable, so annotatable and relatable in turn. This closure lets a justification claim several clauses, lets a relationship between intuitions be an intuition, and lets the graph tangle.</Line>
                <Line>5.5 A section toggles its own annotations by a small square in its heading; the page's layer is every section's toggle at once.</Line>
                <Line>5.6 An annotation draws as a one-line mark in a single rail at the writing's right edge, level with its subject, stacked so marks never collide — one form whether the subject is a heading, a clause or a table row — in the small voice, the why on its hover, and the writing never moves to make room. A relation draws at both of its ends, each citing the other. Nothing draws while the toggle is off, and nothing draws where its subject does not stand.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>6. The open ends</Heading>
            <Paragraph>
                <List />
                <Line>6.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package.</Line>
                <Line>6.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around.</Line>
                <Line>6.3 The justifications associate with the progress; the exact tie stands open.</Line>
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
