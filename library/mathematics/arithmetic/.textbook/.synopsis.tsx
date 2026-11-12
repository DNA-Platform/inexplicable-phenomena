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
            The results of arithmetic, stated and proved. It opens with the formalism: System A, the Peano
            Arithmetic of this work, defined first-order in the standard notation with Gödel's numbering
            preserved, mapped into his system P, and entitled to the name PA.
        </Paragraph>
    </Chapter>
);
