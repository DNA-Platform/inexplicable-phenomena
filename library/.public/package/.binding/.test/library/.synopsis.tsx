import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Synopsis, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            The one book here filed under its own subject, which is what makes it the top of the library rather
            than one more book on the shelf. Everything else stands under it, directly or through another book.
        </Paragraph>
        <Catchword />
    </Chapter>
);
