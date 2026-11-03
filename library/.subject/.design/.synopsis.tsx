import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis } from '../.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title>
            <Parenthetical />
            [[ Synopsis ]]
        </Title>
        <Paragraph>
            Sketches of how this library might look, each a page of HTML made from the bound print with its forms on
            a switch, photographed, and committed to nothing. A sketch asks a question of a page; the manual changes
            only when the librarian says a form is the one.
        </Paragraph>
    </Chapter>
);
