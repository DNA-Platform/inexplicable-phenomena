import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            Libby's notes in her other alphabet: a book whose title, whose chapter and whose heading are written
            in Cyrillic, so that every address the binder writes for it is in Cyrillic too, and the library holds
            a book named in a script other than Latin. Sprint 109, U13.
        </Paragraph>
        <Catchword />
    </Chapter>
);
