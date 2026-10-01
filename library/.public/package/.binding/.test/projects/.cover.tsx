import { Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Title>[[ Some Projects ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <Catchword />
    </Chapter>
);
