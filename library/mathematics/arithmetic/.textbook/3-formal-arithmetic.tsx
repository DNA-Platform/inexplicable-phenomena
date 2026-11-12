import { Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ Formal Arithmetic ]]</Title>
        <Paragraph>
            The specification, 12 November 2026: a formalization of arithmetic that we will use in the Subject
            of Arithmetic.
        </Paragraph>
        <Paragraph>
            The subject's notes carry the material twice over: System A
            as <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means> states it, and the
            first-order exposition <Means>$[[ System A ]]( Arithmetic Notebook / System A )</Means>, moved there
            from this book on the ruling that the textbook's chapters follow the entry being specified.
        </Paragraph>
        <Paragraph>
            The explanation, the formalism with the justification of how it satisfies the specification, and the
            presentations in their contexts are not yet built; this paragraph stands as their placeholder until
            the specification is precise enough to execute on exactly.
        </Paragraph>
    </Chapter>
);
