import { About, Author, Biography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

// A BIOGRAPHY: written by Libby about a persona of hers, and filed under her; About itself, so it is a
// subject in turn and the paper it writes may be authored by it — a book may author when the
// autobiography is its subject.
export default () => (
    <Chapter>
        <Cover />
        <Biography />
        <Title>[[ A Persona ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libby ]]</Subject>
        <About>[[ A Persona ]]</About>
        <Catchword />
    </Chapter>
);
