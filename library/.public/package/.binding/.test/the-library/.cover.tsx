import { About, Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from './1-the-shelves.tsx.tsx';

// THE TOP OF THE LIBRARY: the catalogue every book is filed under, itself filed under what it is about —
// Libraries — which is its own name said as a subject. Written by the librarian.
export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <About>[[ The Library ]]</About>
        <Catchword />
    </Chapter>
);
