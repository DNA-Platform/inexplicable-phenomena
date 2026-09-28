import { Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from './.book';

// THE MANUAL'S COVER: by the librarian, filed under the library it accompanies. Doug, 2026-09-28: "the
// catalogue — the book that is the catalogue that represents the subject — as the reference, and then
// this is the accompanying reference manual that gives technical information about the subject."
export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library Reference Manual ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
