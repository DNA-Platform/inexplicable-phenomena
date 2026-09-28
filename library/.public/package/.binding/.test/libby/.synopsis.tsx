import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            A librarian's own account, and the one book here that is by its own subject. Every other book is
            written by her or by someone she has vouched for, so authorship in this library begins with her
            and nowhere else.
        </Paragraph>
        <Catchword />
    </Chapter>
);
