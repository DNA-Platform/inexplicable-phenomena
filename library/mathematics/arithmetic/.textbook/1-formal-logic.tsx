import { Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ Formal Logic ]]</Title>
        <Paragraph>
            The specification, 12 November 2026: a formalization of logic that we will use in the Subject of
            Arithmetic.
        </Paragraph>
        <Paragraph>
            The subject's notes already carry the material: System L, the formal logic
            of <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>, held there in prose with
            the rulings of the formalization sprint applied in place.
        </Paragraph>
        <Paragraph>
            The explanation, the formalism with the justification of how it satisfies the specification, and the
            presentations in their contexts are not yet built; this paragraph stands as their placeholder until
            the specification is precise enough to execute on exactly.
        </Paragraph>
    </Chapter>
);
