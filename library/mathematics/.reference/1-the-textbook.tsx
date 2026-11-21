import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Textbook ]]</Title>
        <Paragraph>
            The textbook is the first place where official results go. A definition or a theorem enters it only as
            I have ruled it in the room; what I have not ruled stays a notebook note. The textbook of the first
            subject is <Means>$[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>Official results only: every chapter stands on a ruling recorded verbatim in the sprint records.</Line>
            <Line>The official form is the algebraic one, ruled 12 November 2026; the prose stays in the notebook.</Line>
            <Line>Results are stated and proved, and their references resolve into the subject's library of publications.</Line>
        </Paragraph>
        <Paragraph>
            This is the one chapter of this manual, and that is the point of it. The notebook, the project, the
            library of publications and the identity are kinds any subject keeps, and they were moved to the
            library's own manual on my word of 21 November 2026 — "Most of those things should be specified in the
            library manual because they are not specific to mathematics. This one should discuss what is unique to
            Mathematics. The textbook is." They stand
            as <Means>$[[ Our Reference / The Books ]]</Means>. A textbook of results stated and proved in an
            algebraic form is mathematics', and so it stays here.
        </Paragraph>
        <Paragraph>
            What a textbook entry is stands unspecified. I specified it twice, on 12 and 15 November 2026, as a
            chapter attempting to specify one mathematical object and carrying that specification, an explanation,
            the formalism with a justification of how it satisfies the specification, and presentations in
            specified contexts, with a placeholder for whatever was specified and not yet built. The whole
            apparatus that drew it was struck on my word of 21 November, to be specified again from nothing; the
            book is empty and both of those attempts are retired in the subject's notes. Nothing here is enforced
            by code, and this manual holds no code at all until a form is ruled.
        </Paragraph>
    </Chapter>
);
