import { Chapter, Means, Paragraph, Parenthetical, Title } from '@dna-platform/public';
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
            The book holds the official results of arithmetic, stated and proved, and a result enters only as I
            have ruled it. Its official form is the algebraic one. It carries no chapters on my word of
            21 November 2026 and it is to be specified again from nothing.
        </Paragraph>
        <Paragraph>
            Its own specification of 12 November 2026, amended on 15 and 20 November, is retired to the subject's
            notes, where it stands as <Means>$[[ my first specification of this book ]]( Arithmetic Notebook / The Textbook's First Specification )</Means> and records the three retirements it had reached. Nothing of the
            abstraction that carried it is kept: the form of a specification and the content that bore it were
            struck from the library's manuals on the same word, and the next attempt begins in the main library.
        </Paragraph>
    </Chapter>
);
