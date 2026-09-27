import { About, Author, Autobiography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Autobiography />
        <Title>[[ The Log ]]</Title>
        <Author>*[[ The Log ]]</Author>
        <Subject>**[[ The Library ]]</Subject>
        <About>[[ The Log ]]</About>
        <Catchword />
    </Chapter>
);
