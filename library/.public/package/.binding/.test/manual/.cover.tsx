import { Author, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ The Library Reference Manual ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
