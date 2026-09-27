import { About, Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from './1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library ]]</Title>
        <Author>*[[ the log ]]( The Log )</Author>
        <Subject>**[[ The Library ]]</Subject>
        <About>[[ The Library ]]</About>
        <Catchword />
    </Chapter>
);
