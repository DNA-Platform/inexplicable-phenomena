import { Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';

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
                <Line>8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept; the dress is the subject's.</Line>
            </Paragraph>
        </Section>
    </Chapter>
);
