import { Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Logical Form ]]</Title>
        <Paragraph>
            The specification, 12 November 2026: an algebraic and categorical formalization of logic, in terms
            of identities and identification.
        </Paragraph>
        <Paragraph>
            The terms are the work's own: identification is the name ruled
            in <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>, and the algebraic form
            is the textbook's official one, ruled at the formalization sprint's close.
        </Paragraph>
        <Paragraph>
            The explanation, the formalism with the justification of how it satisfies the specification, and the
            presentations in their contexts are not yet built; this paragraph stands as their placeholder until
            the specification is precise enough to execute on exactly.
        </Paragraph>
    </Chapter>
);
