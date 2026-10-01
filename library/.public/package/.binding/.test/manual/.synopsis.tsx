import { Chapter, Paragraph, Parenthetical, Title } from '@dna-platform/public';
import { Catchword } from './.book';
import { Synopsis } from './7-the-explorer.chapters.tsx';

export default () => (
    <Chapter>
        <Synopsis />
        <Title><Parenthetical />[[ Synopsis ]]</Title>
        <Paragraph>
            The technical information that accompanies the library's reference: every tool this library is built
            with stands beside the chapter that explains it, and the library uses that very file. Kept by the
            librarian; each chapter says what the tool is, how the library uses it, and prints it whole as the
            chapter's appendix.
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
