import { About, Author, Chapter, Subject, Title } from '@dna-platform/public';
import { Cover, Catchword } from '../manual/.book';

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
