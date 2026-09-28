import { About, Author, Autobiography, Chapter, Cover, Subject, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Cover />
        <Autobiography />
        <Title>[[ Libby ]]</Title>
        <Author>*[[ Libby ]]</Author>
        <Subject>**[[ Libraries ]]( The Library )</Subject>
        <About>[[ Libby ]]</About>
        <Catchword />
    </Chapter>
);
