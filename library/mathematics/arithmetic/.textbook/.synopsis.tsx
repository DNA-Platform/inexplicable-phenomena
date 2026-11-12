import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Parenthetical />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The results of arithmetic, stated and proved. Four chapters stand specified, 12 November 2026, and
            not yet built: Formal Logic and Formal Arithmetic, the formalizations the Subject of Arithmetic will
            use, and The Logical Form and The Arithmetic Form, their algebraic and categorical counterparts in
            terms of identities and identification. Each opens with its specification and holds the rest as a
            placeholder, the interpolation the textbook's entries allow.
        </Paragraph>
    </Chapter>
);
