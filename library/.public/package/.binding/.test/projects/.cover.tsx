import { Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ Some Projects ]]</Title>
        <Author>*[[ The Log ]]</Author>
        <Subject>**[[ the library ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
