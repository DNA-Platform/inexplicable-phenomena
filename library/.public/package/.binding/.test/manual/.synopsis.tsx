import { Chapter, Paragraph, Parenthetical, Synopsis, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            The technical information that accompanies the library's reference: every tool this library is built
            with stands beside the chapter that explains it, and the library uses that very file. Kept by the
            librarian, who says in each chapter how she uses the tool for a library, and for hers.
        </Paragraph>
        <Catchword />
    </Chapter>
);
