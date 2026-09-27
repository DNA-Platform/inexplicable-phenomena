import { About, Author, Autobiography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

// THE AUTOBIOGRAPHY: the one book that is by its own subject. Libby is the librarian, so her book is
// filed under Libraries like every other; it is About her, so she is a subject, and her name is what
// others file under. Doug, 2026-09-27: "her subject is the library as she is its librarian, but her
// autobiography is about herself - Libby."
export default () => (
    <Chapter>
        <Cover />
        <Autobiography />
        <Title>[[ Libby ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <About>[[ Libby ]]</About>
        <Catchword />
    </Chapter>
);
