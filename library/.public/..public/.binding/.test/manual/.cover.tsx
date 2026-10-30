import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Catchword } from './.book';
import { Cover } from './7-the-explorer.chapters.tsx';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library Reference Manual ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
