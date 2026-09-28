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
        <Paragraph>
            The catalogue is the reference, and this is the manual beside it. Its book file is the door: the book
            class, the theme, the masthead and the byline, the catchword and the faces are exported from there, every
            other book imports its tools from it, and each chapter prints the file it documents exactly as it stands
            on disk. The cover is by the librarian and filed under the library the manual accompanies.
        </Paragraph>
        <Catchword />
    </Chapter>
);
