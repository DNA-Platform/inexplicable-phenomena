import { Append, Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>Beside the Paper</Part>
        <Title>[[ The Sources ]]</Title>
        <Paragraph>
            The notes of this notebook come from six conversations between Doug and Claude in Doug's own library and
            one with Gemini pasted into the last of them. The annotations on those books cannot be referenced from
            this library, so every note cites its conversation by title, its chapter by title and its date, in the
            form (Goldbach through Gödel, The Resolution, 1 November 2026). A quotation is Doug's words with the
            spelling and grammar cleaned and nothing else changed, on his word of 9 November; every quoted span is
            checked against the messages before the notebook is bound, by the checker beside this chapter,
            13-the-sources~check.mjs, which takes the notebook's folder, the conversations' folders and the sprint
            chapter that records the room's words, and finds each span of four words or more in some message, four
            fifths of its words in order, or names the miss.
        </Paragraph>
        <Section>
            <Heading>Goldbach through Gödel</Heading>
            <Paragraph>
                Filed under Semantic Reference Theory, 19 October to 5 November 2026, 701 messages on its path of 805,
                organized in 52 chapters under nine parts, The Finite Proof, The Phantom, The Circle, The Thesis, The
                Axiom, The Identity, The Horizon, First Order Semantics and The Fictions. The publication's parts are
                read from its last fifteen days: The Surviving Sentence of 29 October, where the Gödel-first printing
                was made; The Six Movements of 31 October, where the two notions were reimagined and the flow laid
                out; The Resolution of 1 November, where the sets were ruled never equal and the work ruled to be about
                numbers; The Two Semantics of Zero of 1 and 2 November; The Formal Core of 2 and 3 November;
                Mathematical Relativity and The Objective Bias of 3 November, where Subjective Mathematics was named;
                and The Paper's Flow of 5 November, the read-back every chapter of the first part cites. Its earlier
                thirty-eight chapters are the history the current forms deprecate, cited where a note says what was
                retired.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Gemini session and its catalogue</Heading>
            <Paragraph>
                Subjectivity library catalogue, filed under Semantic Reference Theory, 4 and 5 November 2026, 30
                messages with two pasted files: the transcript of Doug's session with Gemini on 3 November, and his
                unsent message meant as its last. The transcript's Part I states the Gödel result to an outsider and
                the coda tells the result's genesis; both are cited in the first part of this notebook. The rest of the
                session is the program around the paper, in <Means>$[[ ./The Sketches ]]</Means>. In the conversation
                Claude catalogued the session into a time-ordered narrative, parts by topic with Doug's quotes, the
                relationships he and Gemini stated, and nineteen idea documents in his voice, with his quotes'
                spelling corrected at his request; those documents stand in his Claude Docs and could not be read
                from here. His ruling in that conversation governs this notebook's quotes.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The earlier books of the family</Heading>
            <Paragraph>
                Filed under Number Theory, organized. Gödel through Goldbach: The Paper, 12 October 2025, 154 messages
                in twelve chapters, the Sonnet sitting that planned the first paper, cited for the title's history
                and the 2025 framework. Gödel through Goldbach: Semantics and Induction, the same day, 74 messages in
                ten chapters, the Opus sitting beside it, the origin of the entropy measures and of the programme to
                drop induction. Gödel through Goldbach: Coprime Symmetry, 30 March 2026, six messages in one chapter,
                the seed of the symmetric form. And under Semantic Reference Theory, as imported: Logic axioms and
                Gödel's incompleteness, 20 and 21 October 2026, 94 messages, the conversation beside the long one on
                excluded middle, the hallucination of reflection and the line between science and mathematics on
                extrapolation from the finite; not yet organized and not quoted here.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The room</Heading>
            <Paragraph>
                The formalism's chapters, <Means>$[[ ./The Options ]]</Means> and <Means>$[[ ./The Subject of Logic ]]</Means>,
                quote words Doug said to the team in the sprint's room on 9 November 2026, after reading the running
                notebook, and not in a conversation of his library. Those words are recorded verbatim in the sprint's
                chapter of the branch library, Sprint 124, The Subject of Arithmetic, and are cited here as (in the
                room, 9 November 2026); the checker takes that chapter's verbatim passages as a source beside the
                conversations.
            </Paragraph>
        </Section>
        <Section>
            <Heading>How the notes were made</Heading>
            <Paragraph>
                Read from the most recent statement of the work backwards: the read-back of 5 November first, then the
                Gemini session and the coda, then the stretch from 29 October to 3 November whole, then the organized
                conversation's marks by sort, its Revisions saying what replaced what, its Archives what was left, and
                the full text of every message quoted. Each note states the current form, cites what it deprecated by
                date, and separates what Doug tagged for the paper from what he tagged as a sketch. The notes were
                first written otherwise, flat across the conversation, and rewritten on 9 November on his correction:
                start from the parts of a publication, have a sense of causality, newer thoughts deprecate older ones.
            </Paragraph>
        </Section>
        <Append
            identifier="check"
            type=".mjs"
        >
            ![[ check.mjs ]]
        </Append>
    </Chapter>
);
