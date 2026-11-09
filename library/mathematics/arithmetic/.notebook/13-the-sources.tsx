import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Edge</Part>
        <Title>[[ The Sources ]]</Title>
        <Paragraph>
            The notes of this notebook come from six conversations between Doug and Claude in Doug's own library,
            where they stand organized into chapters and annotated by the team. The annotations cannot be referenced
            from this library, so every note cites its conversation by title, its chapter by title, and its date, in
            the form (Goldbach through Gödel, The Two Semantics of Zero, 1 November 2026). A quotation in a note is
            Doug's words to the letter, his spelling kept, from the message the citation names.
        </Paragraph>
        <Section>
            <Heading>Goldbach through Gödel</Heading>
            <Paragraph>
                Filed under Semantic Reference Theory. 19 October to 5 November 2026, 701 messages on its path of 805,
                organized in 52 chapters under nine parts: The Finite Proof, The Permission through Derive and Adopt;
                The Phantom, The Settled Sentence through The Shape of the Phantom Proof; The Circle, The Axiom
                Argument through The De Polignac Identity; The Thesis, The Standing of the Result through The Zero
                Semantics of FOL; The Axiom, The Center Axiom through Something to Picture; The Identity, The Identity
                Element through The Geometric Precedent; The Horizon, The Quantity Contradiction through The Two
                Semantics of Zero; First Order Semantics, The Formal Core through The Subject of Physics; The
                Fictions, The Point of the Fictions through The Paper's Flow. Most of this notebook comes from it: the
                method, the circle, zero, the subject, the theorems and the axiom.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The three of October 2025 and March 2026</Heading>
            <Paragraph>
                Filed under Number Theory. Gödel through Goldbach: The Paper, 12 October 2025, 154 messages in twelve
                chapters, Three Readers through Memory Exhaustion, the Sonnet sitting that planned the first paper;
                it gives this notebook the title's history, the archive of the 2025 framework and several open
                questions. Gödel through Goldbach: Semantics and Induction, the same day, 74 messages in ten
                chapters, The Division of Labour through The Title as a Code, the Opus sitting beside it; it gives the
                origin of the entropy measures, the programme to drop induction and what it became, and the ZFC
                question. Gödel through Goldbach: Coprime Symmetry, 30 March 2026, six messages in one chapter; it
                gives the symmetric form its seed and one open question about shared pairs.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Two not yet organized</Heading>
            <Paragraph>
                Filed under Semantic Reference Theory and standing as imported, one chapter each. Logic axioms and
                Gödel's incompleteness, 20 and 21 October 2026, 94 messages: excluded middle read as exclusive or,
                the hallucination of reflection, the sieve of proofs, and the line between science and mathematics
                on extrapolation from the finite; quoted in <Means>$[[ ./Semantic Reflection ]]</Means>
                and <Means>$[[ ./Finite Proof ]]</Means>. Subjectivity library catalogue, 4 and 5 November 2026, 30
                messages with two pasted files: the cataloguing of a conversation into nineteen idea documents, and
                Doug's passage on what mathematics looks like as new subjects appear, reaching the top as a library;
                not yet quoted here. Both are to be read and annotated with the same tools before their notes are
                moved.
            </Paragraph>
        </Section>
        <Section>
            <Heading>How the notes were moved</Heading>
            <Paragraph>
                The team read the conversations by their marks rather than again whole: each organized book's
                Matters, Summaries, Results with their states, Formalisms, Corrections, Importances, Revisions,
                Archives, Ideas and Questions, listed by sort with the survey tool of Doug's library, and the exact
                text of the messages behind them. The notes moved by sort: Summaries and Revisions
                into <Means>$[[ ./The Subject of Arithmetic ]]</Means> and <Means>$[[ ./The Type of Result ]]</Means>;
                Formalisms and the names the marks declare into the five chapters of the abstractions; Results by
                state into <Means>$[[ ./The Theorems ]]</Means>, <Means>$[[ ./The Axiom ]]</Means>
                and <Means>$[[ ./The Conjectures and Intuitions ]]</Means>; Archives, Ideas and Questions
                into <Means>$[[ ./The Archive ]]</Means> and <Means>$[[ ./The Questions ]]</Means>. Every quoted span
                was checked against the messages before the notebook was bound.
            </Paragraph>
        </Section>
    </Chapter>
);
