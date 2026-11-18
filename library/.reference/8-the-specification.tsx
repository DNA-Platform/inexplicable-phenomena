import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Specification ]]</Title>
        <Paragraph>
            The specification of a specification, written in its own form. I chose the form of a legal
            document on 16 November 2026, its anatomy the contract's — recitals, articles, clauses, defined
            terms, provisos, schedules — evolved for a library that specifies deliverables. The form is the
            library's; a subject may redress it to fit its style, as a theme redresses a page. Mathematics
            writes its own in <Means>$[[ The Specification ]]( Mathematical Reference / The Specification )</Means>,
            and the first full instance is the statement of work
            of <Means>$[[ The Symmetry of Arithmetic ]]( Arithmetic Textbook / The Symmetry of Arithmetic )</Means>.
        </Paragraph>
        <Section>
            <Heading>1. Purpose</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not.</Line>
                <Line>1.2 The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met.</Line>
                <Line>1.3 A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The parts</Heading>
            <Paragraph>
                <List />
                <Line>2.1 The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number.</Line>
                <Line>2.2 The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence.</Line>
                <Line>2.3 The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it.</Line>
                <Line>2.4 The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O.</Line>
                <Line>2.5 The provisos. Where a demand is motivated, the motivation stands beside it and says so.</Line>
                <Line>2.6 The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. Citation</Heading>
            <Paragraph>
                <List />
                <Line>3.1 The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names.</Line>
                <Line>3.2 A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation.</Line>
                <Line>3.3 Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>4. Boundary</Heading>
            <Paragraph>
                <List />
                <Line>4.1 The specification states where it ends. Nothing outside the boundary binds the work.</Line>
                <Line>4.2 What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. Interpolation</Heading>
            <Paragraph>
                <List />
                <Line>5.1 What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on.</Line>
                <Line>5.2 The work closes when the last placeholder is replaced by the thing it stands for.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>6. Permanence</Heading>
            <Paragraph>
                <List />
                <Line>6.1 A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.</Line>
                <Line>6.2 A change is made by changing the specification, in the context of all its other parts.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>7. The implementation</Heading>
            <Paragraph>
                <List />
                <Line>7.1 The implementation meets the specification part by part, and cites each part as it is met, by its number or its label.</Line>
                <Line>7.2 A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other.</Line>
                <Line>7.3 A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>8. Format</Heading>
            <Paragraph>
                <List />
                <Line>8.1 The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses.</Line>
                <Line>8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept, and the tree of section 9 with it; the dress is the subject's.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>9. The tree</Heading>
            <Paragraph>
                <List />
                <Line>9.1 A specification always has numbers or codes, always has nesting, and the numbers nest — the anatomy of 2.3. It need not be only a list of lists, but it can be imagined as one.</Line>
                <Line>9.2 The tree is a projection of the document. Every operation below is an act on the projection, never on the document: a moved part keeps its code and its annotations, because the code carries identity, and permanence (6) is untouched.</Line>
                <Line>9.3 Unique showability: at any moment every part is on the page for exactly one reason or off it for exactly one reason — shown; folded away by an ancestor; hidden by the reader; or standing aside while one part shows alone. Each reason has exactly one control and one inverse, so any view can be read back, and any view can be left.</Line>
                <Line>9.4 The operations, each with its inverse, at every level of the tree:</Line>
                <Line>9.4.1 Fold — a press on any part's heading folds its children beneath a quiet count; a second press unfolds.</Line>
                <Line>9.4.2 Hide — a part hides entirely from its gutter; show-all returns every hidden part.</Line>
                <Line>9.4.3 Only — a part stands alone, the one thing on the screen, its ancestors' headings standing as its path; at most one part stands alone at a time; pressing it again, or everything, returns the rest. A figure's mark (9.8) is a second door to this state, left by the same inverses.</Line>
                <Line>9.4.4 Move — parts move beside one another to compare, across sections and at any level; sections reorder among themselves.</Line>
                <Line>9.4.5 Reset — the strongest inverse: every part reseated in the document's own order, every fold, hide and alone-state cleared at once. Each part carries its home and its seat from the rendering, so the return is exact.</Line>
                <Line>9.5 The bar: the whole tree's verbs stand up top — the annotation layer's square, sections folding the tree to its headings where they can be cleared and reordered, expand unfolding every level, show all while something hides, everything while one part stands alone, and reset always.</Line>
                <Line>9.6 The annotations are consistent: one form for every subject — a one-line mark in a single rail at the writing's right edge, level with its subject, stacked so marks never collide, and the writing never moves to make room. The why stands on the mark's hover and the claim on its press; a relation's visible end still draws, citing across; a mark draws only while its subject stands and its section's square is on. No square starts checked — the layer stands dark until the bar's square lights every mark.</Line>
                <Line>9.7 The code of this tree stands in the appendix: the specification held as an object, its rendering operable — and the appendix page is that code run on this specification itself.</Line>
                <Line>9.8 The figure — an annotation naming an object of the specification by its code, with a title and a caption. Its mark rides the rail; its press is 9.4.3 performed on its object, dressed: the title above, the caption beneath, unshown until the title is pressed. A figure without a title is just the writing, alone.</Line>
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="tree"
            type=".html"
        >
            ![[ tree.html ]]
        </Append>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
