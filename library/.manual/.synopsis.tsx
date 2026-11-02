import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from './4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            The least a library needs to bind: the book every other book here extends, the theme it registers, the
            masthead and the byline it draws from a cover, and the faces a cover, a synopsis and a table wear. Each
            chapter says what the tool is and the file beside it is the tool. Borrowed, to begin, from the binder's own
            test library, and rebuilt from here by sketches.
        </Paragraph>
    </Chapter>
);
