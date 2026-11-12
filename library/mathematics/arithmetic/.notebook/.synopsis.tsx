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
            The notes of the paper, moved here from Doug's library and organized as the specification of a
            publication: its parts from the preface to Goldbach, each in the form that stands and citing what it
            deprecated; the rulings and the documents; the sketches set aside with his tag on each; and the
            formalism, the options the notes hold, the algebraic model of the subject of logic he stated on
            9 November, toward a compact expression and its formalization in PA, the connection found on
            12 November between the subjective reading of Gödel and Riemann's exchange of zero and infinity, the
            definition of Gödel's system P looked up from the held paper toward deciding the paper's PA, and the
            parts of the paper's argument, each with a sketch of its formalization and the references beside it.
        </Paragraph>
    </Chapter>
);
